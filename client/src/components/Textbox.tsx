import React from "react"
import clsx from "clsx"

type TextboxProps = {
    type: string,
    placeholder: string,
    label: string,
    className: string,
    register: any,
    name: string,
    error?: string
}

export const Textbox = React.forwardRef<HTMLInputElement, TextboxProps>(({type,placeholder,label,className,register,name,error}: TextboxProps,ref)=> {
  return (
    <div>
        {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>}
        <input 
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            className={clsx("mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",className)}
            ref={ref}
            {...register(name)}
            aria-invalid={error ? "true" : "false"}
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
})
