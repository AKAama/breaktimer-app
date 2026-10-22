import { useTranslation } from "react-i18next";
import { Settings } from "../../../types/settings";
import SettingsCard from "./settings-card";

interface StartupCardProps {
  settingsDraft: Settings;
  onSwitchChange: (field: string, checked: boolean) => void;
}

export default function StartupCard({
  settingsDraft,
  onSwitchChange,
}: StartupCardProps) {
  const { t } = useTranslation();

  return (
    <SettingsCard
      title={t("settings.startup.title")}
      helperText={t("settings.startup.helperText")}
      toggle={{
        checked: settingsDraft.autoLaunch,
        onCheckedChange: (checked) => onSwitchChange("autoLaunch", checked),
      }}
    />
  );
}
