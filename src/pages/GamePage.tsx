import { ScorePanel } from "@/components/ScorePanel";
import { WordForm } from "@/components/WordForm";
import { WordsHistory } from "@/components/WordsHistory";
import { useEffect, useState } from "react";

const TIMER = 3;

export default function GamePage() {
    const [words,setWords] = useState<string[]>([]);
    const [score,setScore] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(TIMER);
    const [gameStarted, setGameStarted] = useState(false);

    const handleWordSubmit  = (word:string)=>{
        console.log(word)

        if (!gameStarted) {
            setGameStarted(true);
        }

        setTimeRemaining(TIMER);
        setScore((previousScore) => previousScore + 1);
        setWords((previousWords) => [...previousWords, word]);
    }

    const handleGameOver = () => {
        console.log("fin de la partida");

        setWords([]);
        setGameStarted(false);
        setTimeRemaining(TIMER);
        setScore(0);
    }

    useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
        setTimeRemaining((previousTime) => {
            if (previousTime <= 1) {
                clearInterval(interval);
                handleGameOver();

                return 0;
            }

            return previousTime - 1;
        });
    }, 1000);

    return () => clearInterval(interval);
}, [gameStarted]);

    return (
    <main className="flex flex-col min-h-svh p-8">
        <header className="flex justify-center py-8">
            <h1 className="text-3xl">Palabras encadenadas</h1>
        </header>

        <div className="flex flex-1 py-8">
            <WordsHistory className="min-w-101" words={words}/>
            <section className="flex flex-col flex-2 items-center gap-8">
                    <span>Tiempo: {gameStarted ? String(timeRemaining).padStart(2, "0") : "--"}</span>
                <div>letra actual a usar</div>
                <WordForm className="justify-center" onWordSubmit={handleWordSubmit } />
                <div>mensaje a mostrar</div>
            </section>
            <ScorePanel className="min-w-101" score={score}/>
        </div>
        
    </main >
    );
}