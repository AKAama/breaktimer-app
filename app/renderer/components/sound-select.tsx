import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SoundType } from "../../types/settings";

interface SoundSelectProps {
  value: SoundType;
  onChange: (value: SoundType) => void;
  disabled?: boolean;
  volume?: number;
}

export function SoundSelect({
  value,
  onChange,
  disabled,
  volume = 1,
}: SoundSelectProps) {
  const { t } = useTranslation();

  const playSound = (soundType: SoundType) => {
    if (soundType === SoundType.None) return;
    ipcRenderer.invokeStartSound(soundType, volume);
  };

  return (
    <div className="flex gap-4">
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="flex-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={SoundType.None}>
            {t("settings.audio.none")}
          </SelectItem>
          <SelectItem value={SoundType.Gong}>
            {t("settings.audio.gong")}
          </SelectItem>
          <SelectItem value={SoundType.Blip}>
            {t("settings.audio.blip")}
          </SelectItem>
          <SelectItem value={SoundType.Bloop}>
            {t("settings.audio.bloop")}
          </SelectItem>
          <SelectItem value={SoundType.Ping}>
            {t("settings.audio.ping")}
          </SelectItem>
          <SelectItem value={SoundType.Scifi}>
            {t("settings.audio.scifi")}
          </SelectItem>
        </SelectContent>
      </Select>
      {value !== SoundType.None && (
        <Button
          size="icon"
          variant="ghost"
          disabled={disabled}
          onClick={() => playSound(value)}
        >
          <Play className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
