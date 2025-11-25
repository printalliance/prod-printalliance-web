import { DialogHTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
} & DialogHTMLAttributes<HTMLDivElement>;

const Modal = ({
  open,
  onClose,
  title,
  children,
  className,
  ...props
}: PropsWithChildren<ModalProps>) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      {...props}
    >
      <div className={clsx("w-full max-w-lg rounded-2xl bg-white p-6", className)}>
        <div className="mb-4 flex items-center justify-between">
          {title && <h3 className="text-xl font-semibold text-navy">{title}</h3>}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-500 transition hover:text-red"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

