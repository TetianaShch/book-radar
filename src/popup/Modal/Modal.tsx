import { useEffect, useRef, type ReactNode } from "react";
import CloseButton from "../CloseButton/CloseButton";
import css from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
};

function Modal({ isOpen, children, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog className={css.modal} ref={modalRef} onClose={onClose}>
      <CloseButton onClose={onClose} />

      <div className={css.modalContent}>{children}</div>
    </dialog>
  );
}

export default Modal;
