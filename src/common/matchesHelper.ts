import type { LeagueMatch } from '@/models/app/matchModel'
import { getPlayerNameByDiscordId } from '@/common/tournamentUtils'
import type { LeagueAssignedUser } from '@/models/app/leagueModel'

export function getPlayerMatchesByLeague(
  leagueId: number,
  playerId: string,
  allMatches: LeagueMatch[]
) {
  return allMatches.filter((match) => {
    return (
      (match.player1Discordid === playerId || match.player2Discordid === playerId) &&
      match.leagueId === leagueId
    )
  })
}

export function getOpposingPlayerName(
  playerId: string,
  match: LeagueMatch,
  leagueSignUps: LeagueAssignedUser[]
): string {
  return playerId === match.player1Discordid
    ? getPlayerNameByDiscordId(match?.player2Discordid, leagueSignUps)
    : getPlayerNameByDiscordId(match?.player1Discordid, leagueSignUps)
}

export function getOpposingPlayer(
  playerId?: string,
  match?: LeagueMatch,
  leagueSignUps?: LeagueAssignedUser[]
): LeagueAssignedUser | undefined {
  if (!playerId || !match || !leagueSignUps) return undefined

  return playerId === match.player1Discordid
    ? leagueSignUps.find((player) => player.discordUserId === match.player2Discordid)
    : leagueSignUps.find((player) => player.discordUserId === match.player1Discordid)
}

export function getWinningPlayerId(match?: LeagueMatch): string | undefined {
  if (match === undefined || match.player1Score === match.player2Score) return undefined

  return match.player1Score > match.player2Score ? match.player1Discordid : match.player2Discordid
}
