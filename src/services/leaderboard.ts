const STORAGE_KEY = "leaderboard";

export function getLeaderboard(): number[] {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    return JSON.parse(data) as number[];
}

export function saveScore(score: number): void {
    const leaderboard = getLeaderboard();

    leaderboard.push(score);

    leaderboard.sort((a, b) => b - a);

    const top10 = leaderboard.slice(0, 10);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(top10));
}
