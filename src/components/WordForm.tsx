import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { cn } from "@/lib/utils";

type WordFormProps = React.ComponentProps<"form"> & {
    onWordSubmit: (word: string) => void;
    onWordChange?: () => void;
};


export const WordForm = ({onWordSubmit,onWordChange,className,...props}: WordFormProps) => {
    const [word,setWord] = useState("");

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formattedWord = word.trim().toUpperCase();

        if (!formattedWord) return;

        onWordSubmit(formattedWord);

        setWord("");
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,) => {
        const value = e.target.value;

        setWord(value);
        onWordChange?.();
    };

    return(
        <form className={cn("flex flex-col items-center gap-4", className)}
        onSubmit={handleSubmit} {...props}>
            <Input className="text-center" type="text" placeholder="Ingrese una palabra" maxLength={20}
            spellCheck={false} autoCorrect="off" autoComplete="off"
            value={word} onChange={handleInputChange}/>
            <Button type="submit">Enviar</Button>
        </form>
    )
}