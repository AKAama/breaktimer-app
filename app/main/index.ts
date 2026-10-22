import { app, shell } from "electron";
import electronDebug from "electron-debug";
import log from "electron-log";
import { autoUpdater } from "electron-updater";
import { setAutoLauch } from "./lib/auto-launch";
import { initBreaks } from "./lib/breaks";
import "./lib/ipc";
import { showNotification } from "./lib/notifications";
import { resolveLanguage } from "../shared/i18n";
import {
  getAppInitialized,
  getSettings,
  setSettings,
} from "./lib/store";
import { defaultSettings } from "../types/settings";
import { initMainI18n, t } from "./lib/i18n";
import { initTray } from "./lib/tray";
import { createSettingsWindow, createSoundsWindow } from "./lib/windows";

const gotTheLock = app.requestSingleInstanceLock();

app.on("second-instance", (event, commandLine, workingDirectory) => {
  log.info("Second instance detected, opening settings window");
  log.info(`Command line: ${commandLine}`);
  log.info(`Working directory: ${workingDirectory}`);
  createSettingsWindow();
});

app.on("activate", () => {
  log.info("App activated, opening settings window");
  createSettingsWindow();
});

if (!gotTheLock) {
  log.info("App already running");
  app.exit();
}

function getDownloadUrl(): string {
  switch (process.platform) {
    case "win32":
      return "https://github.com/tom-james-watson/breaktimer-app/releases/latest/download/BreakTimer.exe";
    case "linux":
      return "https://github.com/tom-james-watson/breaktimer-app/releases/latest";
    default:
      throw new Error("Download URL should not be called for macOS");
  }
}

function shouldAutoInstall(): boolean {
  const isMac = process.platform === "darwin";
  const isLinux = process.platform === "linux";

  return isMac || isLinux;
}

function checkForUpdates(): void {
  log.info("Checking for updates...");
  autoUpdater.logger = log;

  autoUpdater.on("error", (error) => {
    log.error(`Auto updater error: ${error}`);
  });

  if (shouldAutoInstall()) {
    autoUpdater.checkForUpdatesAndNotify().catch((error) => {
      log.error(`Unable to run auto updater: ${error}`);
    });
  } else {
    autoUpdater.autoDownload = false;

    autoUpdater.on("update-available", (info) => {
      log.info("Update available:", info);

      const downloadUrl = getDownloadUrl();

      showNotification(
        t("notifications.updateAvailable"),
        t("notifications.updateAvailableBody"),
        () => {
          shell.openExternal(downloadUrl).catch((error) => {
            log.error(`Failed to open download URL: ${error}`);
          });
        },
        false,
      );
    });

    autoUpdater.checkForUpdates().catch((error) => {
      log.error(`Unable to check for updates: ${error}`);
    });
  }
}

if (process.env.NODE_ENV === "production") {
  const sourceMapSupport = require("source-map-support");
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === "development" ||
  process.env.DEBUG_PROD === "true"
) {
  electronDebug();
}

// function installExtensions() {
//   const installer = require('electron-devtools-installer')
//   const forceDownload = !!process.env.UPGRADE_EXTENSIONS
//   const extensions = ['REACT_DEVELOPER_TOOLS']
//
//   return Promise.all(
//     extensions.map(name => installer.default(installer[name], forceDownload))
//   ).catch(console.log)
// }

// Don't exit on close all windows - live in tray
app.on("window-all-closed", () => {
  // Pass
});

app.on("ready", async () => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.DEBUG_PROD === "true"
  ) {
    // Extensions are broken on electron 10
    // await installExtensions()
  }

  // Required for notifications to work on windows
  if (process.platform === "win32") {
    app.setAppUserModelId("com.tomjwatson.breaktimer");
  }

  if (process.platform === "darwin") {
    app.dock?.hide();
  }

  const settings = getSettings();
  initMainI18n(settings.language);

  const appInitialized = getAppInitialized();
  const resolvedLanguage = resolveLanguage(settings.language, app.getLocale());

  // Seed localized break title/message for first-run Chinese systems.
  if (
    !appInitialized &&
    resolvedLanguage === "zh-CN" &&
    settings.breakTitle === defaultSettings.breakTitle &&
    settings.breakMessage === defaultSettings.breakMessage
  ) {
    setSettings(
      {
        ...settings,
        breakTitle: t("defaults.breakTitle"),
        breakMessage: t("defaults.breakMessage"),
      },
      false,
    );
  }

  if (!appInitialized) {
    if (process.env.NODE_ENV !== "development") {
      setAutoLauch(true);
    }
    // Show settings window on first launch instead of notification
    createSettingsWindow();
    // Don't set app as initialized yet - we'll do that after the user dismisses the modal
  } else {
    // App has been initialized before, don't show settings automatically
  }

  initBreaks();
  initTray();
  createSoundsWindow();

  if (process.env.NODE_ENV !== "development") {
    checkForUpdates();
  }
});
