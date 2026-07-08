import { WordForm } from "@/components/WordForm";
import { WordsHistory } from "@/components/WordsHistory";
import { useState } from "react";


export default function GamePage() {
    const [words,setWords] = useState<string[]>([]);

    const handleWordSubmit  = (word:string)=>{
        console.log(word)
        setWords((previousWords) => [...previousWords, word]);
    }

    return (
    <main className="flex flex-col min-h-svh p-8">
        <header className="flex justify-center py-8">
            <h1 className="text-3xl">Palabras encadenadas</h1>
        </header>

        <div className="flex flex-1 items-baseline py-8">
            <WordsHistory words={words}/>
            <section className="flex flex-col flex-1 items-center gap-8">
                <div>Timer</div>
                <div>letra actual a usar</div>
                <WordForm className="justify-center" onWordSubmit={handleWordSubmit } />
                <div>mensaje a mostrar</div>
            </section>
            <div className="w-100"></div>
        </div>
        
    </main >
    );
}