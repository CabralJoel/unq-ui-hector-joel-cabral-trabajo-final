import { WordForm } from "@/components/WordForm";
import { WordsHistory } from "@/components/WordsHistory";
import { useEffect, useState } from "react";

const TIMER = 3;

export default function GamePage() {
    const [words,setWords] = useState<string[]>([]);
    const [timeRemaining, setTimeRemaining] = useState(TIMER);
    const [gameStarted, setGameStarted] = useState(false);

    const handleWordSubmit  = (word:string)=>{
        console.log(word)

        if (!gameStarted) {
            setGameStarted(true);
        }

        setTimeRemaining(TIMER);
        setWords((previousWords) => [...previousWords, word]);
    }

    const handleGameOver = () => {
        console.log("fin de la partida");

        setWords([]);
        setGameStarted(false)
        setTimeRemaining(TIMER);
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
            <WordsHistory words={words}/>
            <section className="flex flex-col flex-1 items-center gap-8">
                    <span>Tiempo: {gameStarted ? String(timeRemaining).padStart(2, "0") : "--"}</span>
                <div>letra actual a usar</div>
                <WordForm className="justify-center" onWordSubmit={handleWordSubmit } />
                <div>mensaje a mostrar</div>
            </section>
            <div className="w-100"></div>
        </div>
        
    </main >
    );
}