import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { cn } from "@/lib/utils";

type WordFormProps = React.ComponentProps<"form"> & {
	handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
	handleInputChange: (
		e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
	) => void;
	value: string;
	pending: boolean;
	reset?: string;
};

export const WordForm = ({
	handleSubmit,
	handleInputChange,
	value,
	pending,
	className,
	...props
}: WordFormProps) => {
	return (
		<form
			className={cn("flex flex-col items-center gap-4", className)}
			onSubmit={handleSubmit}
			{...props}
		>
			<Input
				className="text-center"
				type="text"
				placeholder="Ingrese una palabra"
				maxLength={25}
				spellCheck={false}
				autoCorrect="off"
				autoComplete="off"
				value={value}
				onChange={handleInputChange}
			/>

			<Button type="submit" disabled={pending}>
				Enviar
			</Button>
		</form>
	);
};
