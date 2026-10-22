import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";
import { Settings } from "../../../types/settings";
import SettingsCard from "./settings-card";
import TimeInput from "./time-input";

interface SmartBreaksCardProps {
  settingsDraft: Settings;
  onSwitchChange: (field: string, checked: boolean) => void;
  onDateChange: (fieldName: string, newVal: Date) => void;
}

export default function SmartBreaksCard({
  settingsDraft,
  onSwitchChange,
  onDateChange,
}: SmartBreaksCardProps) {
  const { t } = useTranslation();

  return (
    <SettingsCard
      title={t("settings.smartBreaks.title")}
      helperText={t("settings.smartBreaks.helperText")}
      toggle={{
        checked: settingsDraft.idleResetEnabled,
        onCheckedChange: (checked) =>
          onSwitchChange("idleResetEnabled", checked),
      }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            {t("settings.smartBreaks.minimumIdleTime")}
          </Label>
          <TimeInput
            precision="seconds"
            value={settingsDraft.idleResetLengthSeconds}
            onChange={(seconds) => {
              const date = new Date();
              date.setHours(Math.floor(seconds / 3600));
              date.setMinutes(Math.floor((seconds % 3600) / 60));
              date.setSeconds(seconds % 60);
              onDateChange("idleResetLength", date);
            }}
            disabled={!settingsDraft.idleResetEnabled}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={settingsDraft.idleResetNotification}
            onCheckedChange={(checked) =>
              onSwitchChange("idleResetNotification", checked)
            }
            disabled={!settingsDraft.idleResetEnabled}
          />
          <Label>{t("settings.smartBreaks.showNotification")}</Label>
        </div>
      </div>
    </SettingsCard>
  );
}
