import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { cn } from "@/lib/utils";

type WordFormProps = React.ComponentProps<"form"> & {
    onWordSubmit: (word: string) => void;
    disabled?: boolean;
};


export const WordForm = ({onWordSubmit,disabled,className,...props}: WordFormProps) => {
    const [word,setWord] = useState("");

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formattedWord = word.trim().toLowerCase();

        if (!formattedWord) return;

        onWordSubmit(formattedWord);

        setWord("");
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,) => {
        const value = e.target.value;

        setWord(value);
    };

    return(
        <form className={cn("flex flex-col items-center gap-4", className)}
        onSubmit={handleSubmit} {...props}>
            <Input className="text-center" type="text" placeholder="Ingrese una palabra" maxLength={25} 
            value={word} onChange={handleInputChange} disabled={disabled}/>
            <Button type="submit" disabled={disabled}>Enviar</Button>
        </form>
    )
}