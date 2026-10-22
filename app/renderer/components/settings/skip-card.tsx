import { useTranslation } from "react-i18next";
import { Settings } from "../../../types/settings";
import SettingsCard from "./settings-card";

interface SkipCardProps {
  settingsDraft: Settings;
  onSwitchChange: (field: string, checked: boolean) => void;
}

export default function SkipCard({
  settingsDraft,
  onSwitchChange,
}: SkipCardProps) {
  const { t } = useTranslation();

  return (
    <SettingsCard
      title={t("settings.skip.title")}
      helperText={t("settings.skip.helperText")}
      toggle={{
        checked:
          settingsDraft.skipBreakEnabled &&
          !settingsDraft.immediatelyStartBreaks,
        onCheckedChange: (checked) =>
          onSwitchChange("skipBreakEnabled", checked),
        disabled: settingsDraft.immediatelyStartBreaks,
      }}
    />
  );
}
