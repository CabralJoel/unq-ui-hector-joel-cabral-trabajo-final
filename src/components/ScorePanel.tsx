import { cn } from "@/lib/utils";
import { Leaderboard } from "./LeaderBoard";
import type { LeaderboardScore } from "@/services/leaderboard";

type ScorePanelProps = React.ComponentProps<"div"> & {
	score: number;
	bestsCores: LeaderboardScore[];
};

export const ScorePanel = ({
	score,
	bestsCores,
	className,
	...props
}: ScorePanelProps) => {
	return (
		<aside
			className={cn("flex flex-col min-h-0 text-center border", className)}
			{...props}
		>
			<div className="flex flex-col border-b p-8 gap-4">
				<span>Puntaje</span>
				<span>{score}</span>
			</div>

			<Leaderboard bestsCores={bestsCores} />
		</aside>
	);
};
