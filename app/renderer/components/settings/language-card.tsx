import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { LanguagePreference, Settings } from "../../../types/settings";
import SettingsCard from "./settings-card";

interface LanguageCardProps {
  settingsDraft: Settings;
  onLanguageChange: (language: LanguagePreference) => void;
}

export default function LanguageCard({
  settingsDraft,
  onLanguageChange,
}: LanguageCardProps) {
  const { t } = useTranslation();

  return (
    <SettingsCard
      title={t("language.title")}
      helperText={t("language.helperText")}
    >
      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("language.title")}</Label>
          <Select
            value={settingsDraft.language}
            onValueChange={(value) =>
              onLanguageChange(value as LanguagePreference)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">{t("language.system")}</SelectItem>
              <SelectItem value="en">{t("language.english")}</SelectItem>
              <SelectItem value="zh-CN">{t("language.zhCN")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-muted-foreground">{t("language.restartHint")}</p>
      </div>
    </SettingsCard>
  );
}
