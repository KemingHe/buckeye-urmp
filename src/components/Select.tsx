// ./src/components/Select.tsx
//
// Reusable, client-only, react-hook-form select component,
// compatible and styled through the OSU bux-style library.

// Explicitly declare as a NextJS client-only component.
"use client";

// react-hook-form essential imports.
import type {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { ulid } from "ulidx";

// Local type guard utility import.
import isFieldError from "@utils/isFieldError";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface SelectOption {
  value: string;
  label: string;
}

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface SelectProps<T extends FieldValues> {

  // Required props.
  name       : Path<T>;
  register   : UseFormRegister<T>;

  // biome-ignore lint/suspicious/noExplicitAny: required for typing error.
  error      : FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  isLoading  : boolean;
  options    : SelectOption[];

  // Optional props.
  labelText ?: string;
  helperText?: string;
  className ?: string;
}

// -----------------------------------------------------------------------------
export function Select<T extends FieldValues>({
  name,
  register,
  error,
  isLoading,
  options,
  labelText,
  helperText,
  className = "",
}: SelectProps<T>): JSX.Element {
  // Generate unique ID for select.
  const selectId: string = ulid();

  return (
    <div className={`bux-selection-dropdown ${className}`}>
      {labelText && (
        <label
          className="bux-selection-dropdown__label"
          htmlFor={`bux-selection-dropdown__selection-dropdown-${selectId}`}
        >
          {labelText}
        </label>
      )}
      {helperText && (
        <span
          className="bux-selection-dropdown__helper-text"
          id={`bux-selection-dropdown__helper-text-${selectId}`}
        >
          {helperText}
        </span>
      )}
      <div
        className={`bux-selection-dropdown__input ${
          error ? "bux-selection-dropdown__input--error" : ""
        }`}
      >
        <select
          {...register(name)}
          aria-describedby={
            error
              ? `bux-selection-dropdown__error-message-${selectId}`
              : helperText
                ? `bux-selection-dropdown__helper-text-${selectId}`
                : undefined
          }
          aria-invalid={error ? "true" : "false"}
          aria-label={labelText || `Select ${name}`}
          disabled={isLoading}
          id={`bux-selection-dropdown__selection-dropdown-${selectId}`}
        >
          <option value="">{"-- Select --"}</option>
          {options.map((option: SelectOption) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && isFieldError(error) && (
        <span
          className="bux-selection-dropdown__error-message"
          id={`bux-selection-dropdown__error-message-${selectId}`}
        >
          {error.message}
        </span>
      )}
    </div>
  );
}
