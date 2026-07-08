import { cn } from '@/lib/utils'

export const Input = ({ className, ...props }: React.ComponentProps<'input'>) => {
    return (
        <input
        className={cn(
            'rounded border p-4',

            'placeholder:text-input-foreground',

            'user-invalid:border-destructive',
            'user-invalid:focus:outline-destructive',
            'user-invalid:placeholder:text-destructive',

            className,
        )}
        {...props}
        />
    )
}