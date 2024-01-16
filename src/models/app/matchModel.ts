export interface LeagueMatch {
    id: number;
    createdAt: Date;
    leagueId?: number;
    player1Discordid?: string;
    player2Discordid?: string;
    player1Score: number;
    player2Score: number;
    replayIds?: string[];
    matchStatus: MatchStatus;
}

export enum MatchStatus {
    Upcoming = "upcoming",
    Completed = "completed",
    Cancelled = "cancelled"
}
