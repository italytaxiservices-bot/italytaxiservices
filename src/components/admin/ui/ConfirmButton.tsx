"use client";

import type { ButtonHTMLAttributes } from "react";

/**
 * A type="submit" button that asks for confirmation before letting the
 * enclosing form's submit go through — for destructive actions (void,
 * archive, deactivate, delete). window.confirm() is deliberately simple
 * here rather than a custom modal: it's synchronous, blocks the submit
 * event correctly, and needs no extra state/portal machinery.
 */
export function ConfirmButton({
  confirmMessage,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { confirmMessage: string }) {
  return (
    <button
      {...props}
      type="submit"
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
