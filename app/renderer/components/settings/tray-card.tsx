import { FormGroup } from "@/components/ui/form-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { Settings, TrayTextMode } from "../../../types/settings";
import SettingsCard from "./settings-card";

interface TrayCardProps {
  settingsDraft: Settings;
  onSwitchChange: (field: string, checked: boolean) => void;
  onTrayTextModeChange: (value: string) => void;
}

export default function TrayCard({
  settingsDraft,
  onSwitchChange,
  onTrayTextModeChange,
}: TrayCardProps) {
  const { t } = useTranslation();

  return (
    <SettingsCard
      title={t("settings.tray.title")}
      helperText={t("settings.tray.helperText")}
      toggle={{
        checked: settingsDraft.trayTextEnabled,
        onCheckedChange: (checked) =>
          onSwitchChange("trayTextEnabled", checked),
      }}
    >
      <FormGroup label={t("settings.tray.text")}>
        <Select
          value={settingsDraft.trayTextMode}
          disabled={!settingsDraft.trayTextEnabled}
          onValueChange={onTrayTextModeChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TrayTextMode.TimeToNextBreak}>
              {t("settings.tray.timeToNextBreak")}
            </SelectItem>
            <SelectItem value={TrayTextMode.TimeSinceLastBreak}>
              {t("settings.tray.timeSinceLastBreak")}
            </SelectItem>
          </SelectContent>
        </Select>
      </FormGroup>
    </SettingsCard>
  );
}
