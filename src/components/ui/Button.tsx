import { cn } from "@/lib/utils";

export const Button = ({
	className,
	...props
}: React.ComponentProps<"button">) => {
	return (
		<button
			type="button"
			className={cn(
				"bg-button text-primary-foreground rounded-lg px-6 py-3 transition",

				"enabled:hover:opacity-90 enabled:active:scale-95",

				"disabled:cursor-not-allowed disabled:opacity-70",

				className,
			)}
			{...props}
		/>
	);
};
