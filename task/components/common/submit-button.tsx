import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { submitCountLimit, submitted } from "@/lib/formUtils";
import { UseForm } from "@/types/types";
import { cn } from "@/lib/utils";

type SubmitButtonProps = {
  form: UseForm;
  className?: string;
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  disabled?: boolean;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
};

export default function SubmitButton({
  form,
  className,
  variant = "default",
  disabled,
  size,
  children,
}: React.PropsWithChildren<SubmitButtonProps>): JSX.Element {
  return (
    <Button
      type="submit"
      aria-label="submit"
      size={size}
      className={cn(
        className,
        "disabled:bg-muted disabled:dark:bg-muted disabled:text-primary"
      )}
      disabled={submitted(form) || submitCountLimit(form) || disabled}
      aria-disabled={disabled}
      variant={variant}
    >
      {submitted(form) ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}
