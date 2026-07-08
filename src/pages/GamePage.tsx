import { WordForm } from "@/components/WordForm";


export default function GamePage() {
    const handleWordSubmit  = (word:string)=>{
        console.log(word)
    }

    return (
    <div>
        <WordForm onWordSubmit={handleWordSubmit } />
    </div>
    );
}