import { cn } from "@/lib/utils";

type ScorePanelProps = React.ComponentProps<"div"> & {
    score: number;
};

export const ScorePanel = ({score,className,...props}:ScorePanelProps) => {
    return(
        <aside className={cn("flex flex-col text-center border p-8 gap-4",className)}{...props}>
            <span>Puntaje</span>
            <span>{score}</span>
        </aside>
    )
}