import clsx from "clsx";
import { forwardRef } from "react";

export type InputProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  as?: "input" | "textarea" | "select";
  options?: Array<{ label: string; value: string }>;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

const Input = forwardRef<
  HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement,
  InputProps
>(
  (
    {
      id,
      label,
      type = "text",
      placeholder,
      error,
      helperText,
      as = "input",
      options = [],
      className,
      ...props
    },
    ref,
  ) => {
    const sharedClasses =
      "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-800 shadow-sm transition focus:border-navy focus:ring-navy";

    const inputElement =
      as === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          className={clsx(sharedClasses, "min-h-[140px]", className)}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          {...props}
        />
      ) : as === "select" ? (
        <select
          id={id}
          className={clsx(sharedClasses, className)}
          ref={ref as React.Ref<HTMLSelectElement>}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={clsx(sharedClasses, className)}
          ref={ref as React.Ref<HTMLInputElement>}
          {...props}
        />
      );

    return (
      <label htmlFor={id} className="block text-sm font-semibold text-navy">
        {label}
        {inputElement}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
        {error && <p className="mt-1 text-sm text-red">{error}</p>}
      </label>
    );
  },
);

Input.displayName = "Input";

export default Input;

