import { cn } from "@/lib/utils";
import type { LeaderboardScore } from "@/services/leaderboard";

type LeaderboardProps = React.ComponentProps<"div"> & {
	bestsCores: LeaderboardScore[];
};

export const Leaderboard = ({
	bestsCores,
	className,
	...props
}: LeaderboardProps) => {
	const rows = Array.from({ length: 10 }, (_, index) => ({
		position: index + 1,
		data: bestsCores[index],
	}));

	return (
		<div
			className={cn(
				"flex flex-col flex-1 min-h-0 text-center p-4 gap-2",
				className,
			)}
			{...props}
		>
			<h2>Mejores Puntajes</h2>

			<div className="grid grid-rows-10 flex-1">
				{rows.map(({ position, data }) => (
					<div
						key={position}
						className="grid grid-cols-[0.5fr_1fr_1fr] items-center"
					>
						<span>{position}</span>
						<span>{data?.name ?? "---"}</span>
						<span>{data?.score ?? "-"}</span>
					</div>
				))}
			</div>
		</div>
	);
};
