import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ open, onClose }: WelcomeModalProps) {
  const { t } = useTranslation();

  const handleUnderstood = () => {
    ipcRenderer.invokeSetAppInitialized();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-[400px] w-[400px]"
        showCloseButton={false}
      >
        <DialogHeader className="text-left">
          <DialogTitle>{t("welcome.title")}</DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-balance pt-2">
            {t("welcome.description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleUnderstood} className="w-full">
            {t("welcome.confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
