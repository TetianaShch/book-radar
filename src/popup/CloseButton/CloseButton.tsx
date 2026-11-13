import css from "./CloseButton.module.css";

type CloseButtonProps = {
  onClose: () => void;
};

export default function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <button
      type="button"
      className={css.closeButton}
      onClick={onClose}
      aria-label="Закрити вікно"
    >
      ×
    </button>
  );
}
