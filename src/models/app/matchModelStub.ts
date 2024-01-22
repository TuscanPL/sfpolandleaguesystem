import type { MatchStatus } from "./matchModel";

export interface LeagueMatchStub {
    leagueId?: number;
    player1Discordid?: string;
    player2Discordid?: string;
    player1Score: number;
    player2Score: number;
    replayIds?: string[];
    matchStatus: MatchStatus;
}
