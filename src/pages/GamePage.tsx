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
    <main  className="grid min-h-svh grid-cols-[400px_1fr_300px]">
        <WordsHistory words={words}/>
        <section className="flex flex-col items-center justify-center gap-8">
            <h1>Palabras encadenadas</h1>
            <WordForm className="justify-center" onWordSubmit={handleWordSubmit } />
        </section>
        <div></div>
    </main >
    );
}