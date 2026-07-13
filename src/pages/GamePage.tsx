import { GameOverModal } from "@/components/GameOverModal";
import { ScorePanel } from "@/components/ScorePanel";
import { WordForm } from "@/components/WordForm";
import { WordsHistory } from "@/components/WordsHistory";
import { normalizeWord } from "@/lib/utils";
import { validateGameWord } from "@/lib/validations";
import {getLeaderboard,saveScore,type LeaderboardScore,} from "@/services/leaderboard";
import { validateWord } from "@/services/words";
import { useEffect, useState } from "react";

const TIMER = 15;

type GameStatus = "waiting" | "playing" | "game-over";

export default function GamePage() {
	const [words, setWords] = useState<string[]>([]);
	const [timeRemaining, setTimeRemaining] = useState(TIMER);
	const [gameStatus, setGameStatus] = useState<GameStatus>("waiting");
	const [word, setWord] = useState("");
	const [pending, setPending] = useState(false);
	const [error, setError] = useState("");
	const [leaderboard, setLeaderboard] = useState<LeaderboardScore[]>(() =>
		getLeaderboard(),
	);

	const score = words.reduce((total, usedWord) => total + usedWord.length, 0);

	//LOGICA DEL FORM
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
	) => {
		const value = e.target.value;

		setError("");

		const formattedWord = value.trim().toUpperCase();

		setWord(formattedWord);
	};

	//SUBMIT CON VALIDACIONES
	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPending(true);

		if (!word) {
			setPending(false);
			return;
		}

		const normalizedWord = normalizeWord(word);

		const validation = validateGameWord(normalizedWord, words);

		if (!validation.valid) {
			setError(validation.error);
			setPending(false);
			return;
		}

		validateWord(normalizedWord)
			.then((exists) => {
				if (!exists) {
					setError("La palabra no existe.");
					return;
				}

				setWords((previousWords) => [...previousWords, normalizedWord]);
				setWord("");
				setTimeRemaining(TIMER);
				
			})
			.catch(() => setError("No fue posible validar la palabra"))
			.finally(() =>{
				if (gameStatus === "waiting") {
					setGameStatus("playing");
				}
				setPending(false)});
	};

	const handleGameOver = () => {
		setGameStatus("game-over");
		setWord("");
		setError("");
	};

	//GUARDAR PUNTAJE Y JUEGO NUEVO
	const handleNewGame = (name: string) => {
		if(name.length > 0){
			saveScore({ name, score });
			setLeaderboard(getLeaderboard());
		}

		setGameStatus("waiting");
		setTimeRemaining(TIMER);
		setWords([]);
	};

	//LOGICA DEL TIMER
	useEffect(() => {
		if (timeRemaining === 0) {
			handleGameOver();
		}
	}, [timeRemaining]);

	useEffect(() => {
		if (gameStatus !== "playing") return;

		const interval = setInterval(() => {
			setTimeRemaining((previousTime) => {
				if (previousTime === 0) {
					clearInterval(interval);
					return 0;
				}

				return previousTime - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [gameStatus]);

	return (
		<main className="flex flex-col h-svh p-8 bg-background text-white">
			<header className="flex justify-center py-8">
				<h1 className="text-3xl">Palabras encadenadas</h1>
			</header>

			<div className="flex flex-1 py-8">
				<WordsHistory className="min-w-101 max-h-172.5" words={words} />

				<section className="flex flex-col flex-2 items-center gap-8 px-4 py-12">
					<span>
						Tiempo:{" "}
						{gameStatus === "playing"
							? String(timeRemaining).padStart(2, "0")
							: "--"}
					</span>

					<span>
						Letra a usar:{" "}
						{words.length > 0 ? words.at(-1)?.at(-1)?.toUpperCase() : "-"}
					</span>

					<WordForm
						handleSubmit={handleSubmit}
						handleInputChange={handleInputChange}
						value={word}
						pending={pending}
						reset={gameStatus}
					/>

					<span className="text-center">{error}</span>
				</section>

				<ScorePanel
					className="min-w-101"
					score={score}
					bestsCores={leaderboard}
				/>
			</div>

			{gameStatus === "game-over" && (
				<GameOverModal words={words} onClose={handleNewGame} />
			)}
		</main>
	);
}
