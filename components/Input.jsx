"use client"
import { Input } from "@/components/ui/input"
import { FormControl,
    FormMessage,
    FormLabel,
    FormField,
    FormItem
 } from "./ui/form"

export default function CustomInput({
    control,
    type,
    label,
    className,
    id,
    placeholder,
    children,
    required = false,
    disabled = false,
}) {
    
    return (
        <FormField
            control={control}
            name={id}
            render={({ field, formState }) => (
                <FormItem>
                    <FormLabel className="text-xs">{label}</FormLabel>
                    <FormControl>
                        <div className={`grid grid-cols-[32px_1fr] sm:grid-cols-[32px_1fr_auto] grid-rows-1 items-center place-items-center max-w-[90vw] border-[1px] rounded ${formState.errors ? 'border-red' : ''}`}>
                            {children}
                            <Input type={type} className={`${className} border-none !outline-none !ring-0 !border-0 focus-visible:ring-offset-0 text-sm text-dark-gray`} {...field} required={required} disabled={disabled} id={id} placeholder={placeholder} />
                            <FormMessage className="hidden sm:block !text-red text-end me-2 text-xs"/>
                        </div>
                    </FormControl>
                    <FormMessage className="sm:hidden !text-red text-xs"/>
                    
                </FormItem>
            )}
        />
    )
}
