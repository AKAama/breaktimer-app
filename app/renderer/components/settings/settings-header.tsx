import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

interface Props {
  handleSave: () => void;
  showSave: boolean;
}

export default function SettingsHeader(props: Props) {
  const { handleSave, showSave } = props;
  const { t } = useTranslation();

  return (
    <div className="border-b border-border bg-background">
      <nav className="flex items-center justify-between p-4 h-16 min-h-16">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-foreground">
            {t("settings.title")}
          </h1>
        </div>
        {showSave && (
          <div className="flex items-center">
            <Button variant="outline" onClick={handleSave}>
              {t("settings.save")}
            </Button>
          </div>
        )}
      </nav>
      <div className="px-4 pb-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="break-settings">
            {t("settings.tabs.general")}
          </TabsTrigger>
          <TabsTrigger value="working-hours">
            {t("settings.tabs.workingHours")}
          </TabsTrigger>
          <TabsTrigger value="customization">
            {t("settings.tabs.customization")}
          </TabsTrigger>
          <TabsTrigger value="system">{t("settings.tabs.system")}</TabsTrigger>
        </TabsList>
      </div>
    </div>
  );
}
