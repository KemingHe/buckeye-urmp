// ./src/components/Textarea.tsx
//
// Reusable, client-only, react-hook-form textarea component,
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
export interface TextareaProps<T extends FieldValues> {

  // Required props.
  name       : Path<T>;
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
export function Textarea<T extends FieldValues>({
  name,
  placeholder,
  register,
  error,
  isLoading,
  labelText,
  helperText,
  className = "",
}: TextareaProps<T>): JSX.Element {
  // Generate unique ID for textarea.
  const textareaId: string = ulid();

  return (
    <div className={`bux-text-area ${className}`}>
      {labelText && (
        <label
          className="bux-text-area__label"
          htmlFor={`bux-text-area__text-area-${textareaId}`}
        >
          {labelText}
        </label>
      )}
      {helperText && (
        <span
          className="bux-text-area__helper-text"
          id={`bux-text-area__helper-text-${textareaId}`}
        >
          {helperText}
        </span>
      )}
      <textarea
        {...register(name)}
        aria-describedby={
          error
            ? `bux-text-area__error-message-${textareaId}`
            : helperText
              ? `bux-text-area__helper-text-${textareaId}`
              : undefined
        }
        aria-invalid={error ? "true" : "false"}
        aria-label={labelText || `Textarea for ${name}`}
        className={`bux-text-area__text-area min-h-40 ${
          error ? "bux-text-area__text-area--error" : ""
        }`}
        disabled={isLoading}
        id={`bux-text-area__text-area-${textareaId}`}
        placeholder={isLoading ? "Loading..." : placeholder}
      />
      {error && isFieldError(error) && (
        <span
          className="bux-text-area__error-message"
          id={`bux-text-area__error-message-${textareaId}`}
        >
          {error.message}
        </span>
      )}
    </div>
  );
}
