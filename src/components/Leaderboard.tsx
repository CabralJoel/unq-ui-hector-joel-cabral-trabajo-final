import { cn } from "@/lib/utils";


type LeaderboardProps = React.ComponentProps<"div"> & {
    bestsCores: number[];
};

export const Leaderboard = ({bestsCores,className,...props}:LeaderboardProps) => {

    return(
        <div className={cn("flex flex-col min-h-0 text-center p-4 gap-2",className)} {...props}>
            <h2>Mejores Puntajes</h2>

            <ul>
                {bestsCores.length === 0 ? (
                    <p>Todavía no hay puntajes</p>
                ) : (
                    <ul className="space-y-2 overflow-y-auto">
                        {bestsCores.map((score,index)=>(
                            <li key={`${score}-${index}`} >
                                {score}
                            </li>
                        ))}
                    </ul>
                )}
            </ul>

        </div>
    )
}