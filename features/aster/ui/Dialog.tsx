import { useEffect, useId, useRef, type ReactNode } from "react";
import { Icon } from "./Icon";

export function Dialog({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  useEffect(() => {
    const element = dialog.current;
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    element?.showModal();
    return () => {
      element?.close();
      queueMicrotask(() => {
        if (opener?.isConnected) opener.focus();
      });
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="modal-dialog"
      aria-labelledby={headingId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <header className="dialog-heading">
        <h2 id={headingId}>{title}</h2>
        <button
          className="icon-button"
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <Icon name="x" />
        </button>
      </header>
      {children}
    </dialog>
  );
}
