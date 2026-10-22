import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";
import { NotificationType, Settings } from "../../../types/settings";
import SettingsCard from "./settings-card";

interface AdvancedCardProps {
  settingsDraft: Settings;
  onSwitchChange: (field: string, checked: boolean) => void;
}

export default function AdvancedCard({
  settingsDraft,
  onSwitchChange,
}: AdvancedCardProps) {
  const { t } = useTranslation();

  return (
    <SettingsCard title={t("settings.advanced.title")}>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={settingsDraft.immediatelyStartBreaks}
            onCheckedChange={(checked) =>
              onSwitchChange("immediatelyStartBreaks", checked)
            }
            disabled={settingsDraft.notificationType !== NotificationType.Popup}
          />
          <Label>{t("settings.advanced.immediatelyStartBreaks")}</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={settingsDraft.endBreakEnabled}
            onCheckedChange={(checked) =>
              onSwitchChange("endBreakEnabled", checked)
            }
          />
          <Label>{t("settings.advanced.allowEndingEarly")}</Label>
        </div>
      </div>
    </SettingsCard>
  );
}
