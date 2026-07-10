import { Button } from "./ui/Button";

type GameOverModalProps = React.ComponentProps<"div"> & {
    words: string[];
    onClose: () => void;
};

export const GameOverModal = ({words,onClose}:GameOverModalProps)=>{


    const score = words.reduce((total, word) => total + word.length,0,);
    
    return(
        <div className="flex items-center justify-center z-10 fixed inset-0 bg-black/20 ">
            <div className="flex flex-col items-center max-w-2xl rounded-lg border-2 p-10 gap-8 bg-modal shadow-2xl">
                <h2 className="text-2xl">¡Partida terminada!</h2>
                <span>Puntaje</span>
                <span className="text-lg">{score}</span>
                <div className="flex flex-col gap-8 items-center">
                    <p className="text-lg">Palabras usadas: {words.length}</p>
                    <p className="wrap-break-word">
                            {words.length === 0
                                ? "-"
                                : words.join(" → ")}
                        </p>
                </div>
                <Button onClick={onClose}>
                        Nueva Partida
                </Button>
            </div>
            
        </div>
    )
}