import { GameOverModal } from "@/components/GameOverModal";
import { ScorePanel } from "@/components/ScorePanel";
import { WordForm } from "@/components/WordForm";
import { WordsHistory } from "@/components/WordsHistory";
import { validateWord } from "@/services/words";
import { useEffect, useState } from "react";

const TIMER = 3;

type GameStatus ="waiting" | "playing" | "game-over";

export default function GamePage() {
    const [words,setWords] = useState<string[]>([]);
    const [timeRemaining, setTimeRemaining] = useState(TIMER);
    const [gameStatus, setGameStatus] = useState<GameStatus>("waiting");
    const [error, setError] = useState("");

    const score = words.reduce((total, word) => total + word.length,0,);

    const handleWordSubmit  = async  (word:string)=>{
        const lastWord = words.at(-1);

        try{
            if(lastWord && word.at(0) !== lastWord.at(-1)){
                throw new Error("La palabra no respeta la regla de encadenamiento");
            }

            if(words.includes(word)){
                throw new Error("La palabra ya fue utilizada");
            }

            const exists = await validateWord(word);

            if (!exists) {
                throw new Error("La palabra no existe.");
            }

            if (gameStatus !== "playing") {
                setGameStatus("playing");
            }

            setTimeRemaining(TIMER);
            setWords((previousWords) => [...previousWords, word]);
        }
        catch(e:any){
            setError(e.message);
        }
    }

    const handleGameOver = () => {
        setGameStatus("game-over");
    }

    const handleNewGame = () => {
        setGameStatus("waiting");
        setTimeRemaining(TIMER);
        setWords([]);
    }

    useEffect(() => {
    if (gameStatus !== "playing") return;

    const interval = setInterval(() => {
        setTimeRemaining((previousTime) => {
            if (previousTime === 0) {
                clearInterval(interval);
                handleGameOver();

                return 0;
            }

            return previousTime - 1;
        });
    }, 1000);

    return () => clearInterval(interval);
}, [gameStatus]);

    return (
    <main className="flex flex-col h-svh p-8">
        <header className="flex justify-center py-8">
            <h1 className="text-3xl">Palabras encadenadas</h1>
        </header>

        <div className="flex flex-1 py-8">
            <WordsHistory className="min-w-101 max-h-172.5" words={words}/>
            <section className="flex flex-col flex-2 items-center gap-8">
                <span>Tiempo: {gameStatus === "playing" ? String(timeRemaining).padStart(2, "0") : "--"}</span>
                <div>letra actual a usar</div>
                <WordForm className="justify-center" onWordSubmit={handleWordSubmit } onWordChange={()=>setError("")}/>
                <div>{error}</div>
            </section>
            <ScorePanel className="min-w-101" score={score}/>
        </div>
        {gameStatus === "game-over" && (
            <GameOverModal
            words={words}
            onClose={handleNewGame}
        />
        )}
    </main >
    );
}