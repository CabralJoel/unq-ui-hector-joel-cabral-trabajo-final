import { cn } from "@/lib/utils";

type WordsHistoryProps =  React.ComponentProps<"div"> & {
    words : string[]
}

export const WordsHistory=({words,className,...props}:WordsHistoryProps)=>{
    const lastWord = words.at(-1);
    const history = [...words].reverse();

    return(
        <aside className={cn("border min-h-150 rounded min-w-101",className)} {...props}>
            <section className="flex flex-col border-b text-center p-4 gap-2">
                <h2 >Última palabra</h2>

                <p>{lastWord ?? "-"}</p>
            </section>

            <section className="flex flex-col text-center p-4 gap-2 ">
                <h2>Palabras usadas</h2>
                {history.length === 0 ? (
                    <p>Todavía no hay palabras</p>
                ) : (
                    <ul className="space-y-2 overflow-y-auto">
                        {history.map((word,index)=>(
                            <li key={`${word}-${index}`} >
                                {word}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </aside>
    )
}