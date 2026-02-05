import { cx } from "@/features/header/helpers/header.helpers";

export function TriggerButton({
  label,
  open,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  label: string;
  open: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cx(
        "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm",
        "text-black/80 hover:text-black",
        "hover:bg-black/5",
        open && "bg-black/5 text-black",
      )}
    >
      {label}
      <span
        className={cx(
          "inline-flex h-2 w-2 items-center justify-center rounded-full",
          "border border-black text-black/60",
          "transition-transform duration-200",
          open && "bg-primary border-primary",
        )}
      >
        
      </span>
    </button>
  );
}
