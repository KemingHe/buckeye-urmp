// ./src/components/MultiSelect.tsx
//
// Reusable, client-only, react-select and react-hook-form multi-select component,
// compatible and styled through the OSU bux-style library.

// Explicitly declare as a NextJS client-only component.
"use client";

// react-select and react-hook-form essential imports.
import type {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  Path,
  UseFormRegister,
} from "react-hook-form";
import Select, { type MultiValue } from "react-select";
import { ulid } from "ulidx";

// Local type guard utility import.
import isFieldError from "@utils/isFieldError";

// Local select option interface import.
import type { SelectOption } from "@components/Select";

// -----------------------------------------------------------------------------
// biome-ignore format: added alignment for clarity.
export interface MultiSelectProps<T extends FieldValues> {

  // Required props.
  name       : Path<T>;
  register   : UseFormRegister<T>;

  // biome-ignore lint/suspicious/noExplicitAny: required for typing error.
  error      : FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  isLoading  : boolean;
  options    : SelectOption[];

  // onChange event handler.
  onChange   : (value: MultiValue<SelectOption>) => void;

  // Optional props.
  labelText ?: string;
  helperText?: string;
  className ?: string;
}

// -----------------------------------------------------------------------------
export function MultiSelect<T extends FieldValues>({
  name,
  register,
  error,
  isLoading,
  options,
  onChange,
  labelText,
  helperText,
  className = "",
}: MultiSelectProps<T>): JSX.Element {
  // Generate unique ID for multi-select.
  const multiSelectId: string = ulid();

  return (
    <div className={`bux-selection-dropdown ${className}`}>
      {labelText && (
        <label
          className="bux-selection-dropdown__label"
          htmlFor={`bux-selection-dropdown__selection-dropdown-${multiSelectId}`}
        >
          {labelText}
        </label>
      )}
      {helperText && (
        <span
          className="bux-selection-dropdown__helper-text"
          id={`bux-selection-dropdown__helper-text-${multiSelectId}`}
        >
          {helperText}
        </span>
      )}
      <div
        className={`bux-selection-dropdown__input ${
          error ? "bux-selection-dropdown__input--error" : ""
        }`}
      >
        <Select
          {...register(name)}
          aria-describedby={
            error
              ? `bux-selection-dropdown__error-message-${multiSelectId}`
              : helperText
                ? `bux-selection-dropdown__helper-text-${multiSelectId}`
                : undefined
          }
          aria-invalid={error ? "true" : "false"}
          aria-label={labelText || `Select ${name}`}
          id={`bux-selection-dropdown__selection-dropdown-${multiSelectId}`}
          isClearable={true}
          isDisabled={isLoading}
          isLoading={isLoading}
          isMulti={true}
          isSearchable={true}
          onChange={onChange}
          options={options}
        />
      </div>
      {error && isFieldError(error) && (
        <span
          className="bux-selection-dropdown__error-message"
          id={`bux-selection-dropdown__error-message-${multiSelectId}`}
        >
          {error.message}
        </span>
      )}
    </div>
  );
}
