"use client";

import { startTransition, type FormEvent } from "react";

/**
 * React 19 resets every uncontrolled field after a `<form action>` submit —
 * including when the server action returns a validation error, which wipes
 * everything staff typed. Dispatching the action manually from onSubmit
 * skips that automatic reset, so on an error the form keeps its values.
 * Keep `action={formAction}` on the form too as a no-JS fallback.
 */
export function useNoResetSubmit(formAction: (formData: FormData) => void) {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };
}
