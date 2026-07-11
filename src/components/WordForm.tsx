import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { cn } from "@/lib/utils";

type WordFormProps = React.ComponentProps<"form"> & {
	onWordSubmit: (word: string) => Promise<boolean>;
	onWordChange?: () => void;
	reset?: string;
};

export const WordForm = ({
	onWordSubmit,
	onWordChange,
	reset,
	className,
	...props
}: WordFormProps) => {
	const [word, setWord] = useState("");
	const [pending, setPending] = useState(false);

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPending(true);

		if (!word) {
			setWord("");
			setPending(false);
			return;
		}

		const validated = await onWordSubmit(word);

		if (validated) {
			setWord("");
		}

		setPending(false);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
	) => {
		const value = e.target.value;

		const formattedWord = value.trim().toUpperCase();

		setWord(formattedWord);
		onWordChange?.();
	};

	useEffect(() => {
		setWord("");
	}, [reset]);

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
				value={word}
				onChange={handleInputChange}
			/>

			<Button type="submit" disabled={pending}>
				Enviar
			</Button>
		</form>
	);
};
