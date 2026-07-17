import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { calculateScore } from "@/lib/utils";

type GameOverModalProps = React.ComponentProps<"div"> & {
	words: string[];
	onClose: (name: string) => void;
};

export const GameOverModal = ({ words, onClose }: GameOverModalProps) => {
	const [name, setName] = useState("");

	const score = calculateScore(words);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
	) => {
		const value = e.target.value;

		const formattedName = value.trim().toUpperCase();
		setName(formattedName);
	};

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		onClose(name);
	};

	return (
		<div className="flex items-center justify-center z-10 fixed inset-0 bg-black/20 ">
			<div className="flex flex-col items-center max-w-2xl rounded-lg border-2 p-10 gap-8 bg-modal shadow-2xl">
				<h2 className="text-2xl">¡Partida terminada!</h2>

				<span className="text-lg">Puntaje {score}</span>

				<form
					className="flex flex-col items-center gap-8"
					onSubmit={handleSubmit}
				>
					<Input
						className="p-2 text-center uppercase"
						value={name}
						placeholder="AAA"
						maxLength={3}
						onChange={handleInputChange}
					/>
					<span className="text-lg">Palabras usadas: {words.length}</span>

					<div className="flex flex-col max-h-50 gap-8 items-center overflow-y-auto">
						<p className="wrap-break-word">
							{words.length === 0 ? "-" : words.join(" → ")}
						</p>
					</div>

					<Button className="bg-modalbutton" type="submit">
						{name.length === 0 ? "Jugar otra vez" : "Guardar y jugar otra vez "}
					</Button>
				</form>
			</div>
		</div>
	);
};
