import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import {
  getI18n,
  getRendererSystemLocale,
  initI18n,
} from "../shared/i18n";
import Main from "./components/main";

initI18n("system", getRendererSystemLocale());

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");
const root = createRoot(container);
root.render(
  <I18nextProvider i18n={getI18n()}>
    <Main />
  </I18nextProvider>,
);
