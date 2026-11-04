import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
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
      <div className={css.modalContent}>{children}</div>
    </dialog>
  );
}

export default Modal;
