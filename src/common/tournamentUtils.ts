import type { LeagueAssignedUser } from '@/models/app/leagueModel'
import type { MatchStatus } from '@/models/app/matchModel'
import type { LeagueMatchStub } from '@/models/app/matchModelStub'

export function generateRoundRobinSchedule(
  originalPlayers: LeagueAssignedUser[],
  leagueId: number
): LeagueMatchStub[] {
  const matches: LeagueMatchStub[] = []

  const alreadyGeneratedPlayers: string[] = []
  for (let i = 0; i < originalPlayers.length; i++) {
    for (let j = i + 1; j < originalPlayers.length; j++) {
      if (alreadyGeneratedPlayers.includes(originalPlayers[j].discordUserId)) {
        continue
      }

      const match: LeagueMatchStub = {
        player1Discordid: getDiscordUserIdOrUndefined(originalPlayers[i].discordUserId),
        player2Discordid: getDiscordUserIdOrUndefined(originalPlayers[j].discordUserId),
        player1Score: 0,
        player2Score: 0,
        matchStatus: 'upcoming' as MatchStatus,
        leagueId: leagueId
      }

      matches.push(match)
    }

    alreadyGeneratedPlayers.push(originalPlayers[i].discordUserId)
  }

  return matches
}

function getDiscordUserIdOrUndefined(discordUserId: string): string | undefined {
  if (discordUserId === '') {
    return undefined
  }

  return discordUserId
}

export function getPlayerNameByDiscordId(discordId?: string, leagueSignUps?: LeagueAssignedUser[]) {
  if (!discordId || discordId?.length === 0) {
    return '-'
  }

  return leagueSignUps?.find((x) => x.discordUserId === discordId)?.discordName ?? '-'
}
