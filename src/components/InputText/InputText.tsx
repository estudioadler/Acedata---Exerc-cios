'use client'

import React, { useEffect, useRef, useState } from 'react'

interface IInputTextProp {
  disabled?: boolean
  fullWidth?: boolean
  onChange: (value: any) => void
  value: string | number
  startIcon?: JSX.Element
  endIcon?: JSX.Element
  label?: string
  helperText?: string
  placeholder?: string
  type?: string
  className?: string
  min?: string
  max?: string
}

export const InputText = ({
  disabled,
  onChange,
  fullWidth,
  value,
  startIcon,
  endIcon,
  label,
  helperText,
  placeholder,
  type,
  className,
  min,
  max
}: IInputTextProp) => {
  const ref = useRef<HTMLInputElement>(null); // Adicione o tipo para o ref

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (disabled) setIsFocused(false);
  }, [disabled]);

  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          className={`text-xs ${
            isFocused ? 'text-neutral-700' : 'text-neutral-700' 
          }`}
        >
          {label}
        </label>
      )}
      <div
        className={`${
          className || ''
        } [&>svg]:w-5 [&>svg]:h-5 outline-primary/20 outline-4 outline-opacity-20 flex gap-2 px-2 items-center h-11 w-fit rounded border border-solid  ${
          fullWidth ? 'w-full' : ''
        } ${
          isFocused
            ? 'outline border-primary [&>svg]:fill-primary'
            : 'border-gray-ctr-3 [&>svg]:fill-gray-ctr-3'
        } ${disabled ? 'bg-neutral-200' : ''} `}
      >
        <>
          {startIcon}
          <input
            className="w-full outline-none bg-transparent text-neutral-700 placeholder-neutral-700"
            type={type || 'text'}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            disabled={disabled}
            min={min}
            max={max}
            required
          />
          {endIcon}
        </>
      </div>
      {helperText && <p className="text-xs text-red-500">{helperText}</p>}
    </div>
  );
};
