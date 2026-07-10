export type LeaderboardScore = {
    name: string;
    score: number;
};

const STORAGE_KEY = "leaderboard";

export function getLeaderboard(): LeaderboardScore[] {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    return JSON.parse(data) as LeaderboardScore[];
}

export function saveScore(data: LeaderboardScore): void {
    const leaderboard = getLeaderboard();

    leaderboard.push(data);

    leaderboard.sort((a, b) => b.score - a.score);

    const top10 = leaderboard.slice(0, 10);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(top10));
}
