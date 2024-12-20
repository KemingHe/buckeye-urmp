// ./src/components/Input.tsx
//
// Reusable, client-only, react-hook-form input component,
// compatible and styled through the OSU bux-style library.

// Explicitly declare as a NextJS client-only component.
"use client";

// react-hook-form essentail imports.
import type {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { ulid } from "ulidx";

// Local type guard utility imports.
import isFieldError from "@utils/isFieldError";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface InputProps<T extends FieldValues> {

  // Required props.
  name       : Path<T>;
  type       : string;
  placeholder: string;
  register   : UseFormRegister<T>;

  // biome-ignore lint/suspicious/noExplicitAny: required for typing error.
  error      : FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  isLoading  : boolean;

  // Optional props.
  labelText ?: string;
  helperText?: string;
  className ?: string; 
}

// -----------------------------------------------------------------------------
export function Input<T extends FieldValues>({
  name,
  type,
  placeholder,
  register,
  error,
  isLoading,
  labelText,
  helperText,
  className = "",
}: InputProps<T>): JSX.Element {
  // Generate unique ID for input.
  const inputId: string = ulid();

  return (
    <div className={`bux-text-field ${className}`}>
      {labelText && (
        <label
          className="bux-text-field__label"
          htmlFor={`bux-text-field__text-input-${inputId}`}
        >
          {labelText}
        </label>
      )}
      {helperText && (
        <span
          className="bux-text-field__helper-text"
          id={`bux-text-field__helper-text-${inputId}`}
        >
          {helperText}
        </span>
      )}
      <input
        {...register(name)}
        aria-describedby={
          error
            ? `bux-text-field__error-message-${inputId}${
                helperText ? ` bux-text-field__helper-text-${inputId}` : ""
              }`
            : helperText
              ? `bux-text-field__helper-text-${inputId}`
              : undefined
        }
        aria-invalid={error ? "true" : "false"}
        aria-label={labelText || `Input ${name}`}
        className={`bux-text-field__input ${
          error ? "bux-text-field__input--error" : ""
        }`}
        disabled={isLoading}
        id={`bux-text-field__text-input-${inputId}`}
        placeholder={isLoading ? "Loading..." : placeholder}
        type={type}
      />
      {error && isFieldError(error) && (
        <span
          className="bux-text-field__error-message"
          id={`bux-text-field__error-message-${inputId}`}
        >
          {error.message}
        </span>
      )}
    </div>
  );
}
