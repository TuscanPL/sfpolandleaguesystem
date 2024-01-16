import type { LeagueAssignedUser } from "@/models/app/leagueModel";
import type { MatchStatus } from "@/models/app/matchModel";
import type { LeagueMatchStub } from "@/models/app/matchModelStub";

export function generateRoundRobinSchedule(
    originalPlayers: LeagueAssignedUser[],
    leagueId: number
): LeagueMatchStub[] {
    // Create a copy of the players array
    const players = originalPlayers.slice()

    // If the number of players is odd, add a "dummy" player for byes
    if (players.length % 2 !== 0) {
        players.push({
            avatarUrl: '',
            createdAt: new Date(),
            discordName: 'Bye',
            discordUserId: '',
            id: -1
        })
    }

    const matches: LeagueMatchStub[] = []
    for (let round = 0; round < players.length - 1; round++) {
        for (let i = 0; i < players.length / 2; i++) {
            const match: LeagueMatchStub = {
                player1Discordid: getDiscordUserIdOrUndefined(players[i].discordUserId),
                player2Discordid: getDiscordUserIdOrUndefined(players[players.length - 1 - i].discordUserId),
                player1Score: 0,
                player2Score: 0,
                matchStatus: 'Upcoming' as MatchStatus,
                leagueId: leagueId
            }
            
            matches.push(match)
        }

        // Rotate the array, keeping the first player fixed
        const firstPlayer = players.shift()
        const secondPlayer = players.shift()
        players.push(firstPlayer!)
        players.unshift(secondPlayer!)
    }

    return matches
}

function getDiscordUserIdOrUndefined(discordUserId: string): string | undefined {
    if (discordUserId === '') {
        return undefined
    }

    return discordUserId
}