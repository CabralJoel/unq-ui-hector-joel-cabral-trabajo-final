import { GameOverModal } from "@/components/GameOverModal";
import { ScorePanel } from "@/components/ScorePanel";
import { WordForm } from "@/components/WordForm";
import { WordsHistory } from "@/components/WordsHistory";
import { getLeaderboard, saveScore, type LeaderboardScore } from "@/services/leaderboard";
import { validateWord } from "@/services/words";
import { useEffect, useState } from "react";

const TIMER = 1;

type GameStatus ="waiting" | "playing" | "game-over";

export default function GamePage() {
    const [words,setWords] = useState<string[]>([]);
    const [timeRemaining, setTimeRemaining] = useState(TIMER);
    const [gameStatus, setGameStatus] = useState<GameStatus>("waiting");
    const [error, setError] = useState("");
    const [leaderboard,setLeaderboard] = useState<LeaderboardScore[]>(()=>getLeaderboard());

    const score = words.reduce((total, word) => total + word.length,0,);

    const handleWordSubmit  = async  (word:string)=>{
        const lastWord = words.at(-1);

        try{
            if(lastWord && word.at(0) !== lastWord.at(-1)){
                setError("La palabra no respeta la regla de encadenamiento");
                return false;
            }

            if(words.includes(word)){
                setError("La palabra ya fue utilizada");
                return false;
            }

            const exists = await validateWord(word);

            if (!exists) {
                setError("La palabra no existe.");
                return false;
            }

            if (gameStatus === "waiting") {
                setGameStatus("playing");
            }

            setWords((previousWords) => [...previousWords, word]);
            setTimeRemaining(TIMER);

            return true
        }
        catch(e:any){
            setError("No fue posible validar la palabra");
            return false
        }
    }

    const handleGameOver = () => {
        setGameStatus("game-over");
        setError("")
        
    }

    const handleNewGame = (name:string) => {
        saveScore({name,score});
        setLeaderboard(getLeaderboard());
        
        setGameStatus("waiting");
        setTimeRemaining(TIMER);
        setWords([]);
    }

    useEffect(() => {
        if(timeRemaining===0){
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

            <WordsHistory className="min-w-101 max-h-172.5" words={words}/>

            <section className="flex flex-col flex-2 items-center gap-8 px-4 py-12">

                <span>Tiempo: {gameStatus === "playing" ? String(timeRemaining).padStart(2, "0") : "--"}</span>

                <span>Letra a usar: {words.length > 0 ? words.at(-1)?.at(-1)?.toUpperCase() : "-"}</span>

                <WordForm className="justify-center" onWordSubmit={handleWordSubmit } onWordChange={()=>setError("")} reset={gameStatus}/>
                    
                <span className="text-center">{error}</span>
                
            </section>

            <ScorePanel className="min-w-101" score={score} bestsCores={leaderboard}/>
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