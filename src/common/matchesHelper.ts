import { MatchStatus, type LeagueMatch } from '@/models/app/matchModel'
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

export function getPlayerMatches(
  userId: string,
  leagueId: number,
  matches: LeagueMatch[]
): LeagueMatch[] {
  return matches.filter((match) => {
    return (
      match.leagueId === leagueId &&
      (match.player1Discordid === userId || match.player2Discordid === userId)
    )
  })
}

export function isMatchWon(userId: string, match: LeagueMatch): boolean {
  return match.player1Discordid === userId
    ? match.player1Score > match.player2Score
    : match.player2Score > match.player1Score
}

export function isMatchLost(userId: string, match: LeagueMatch): boolean {
  return match.player1Discordid === userId
    ? match.player1Score < match.player2Score
    : match.player2Score < match.player1Score
}

export function getWonMatches(userId: string, matches: LeagueMatch[]): LeagueMatch[] {
  return matches.filter(
    (match) => match.matchStatus === MatchStatus.completed && isMatchWon(userId, match)
  )
}

export function getLostMatches(userId: string, matches: LeagueMatch[]): LeagueMatch[] {
  return matches.filter(
    (match) => match.matchStatus === MatchStatus.completed && isMatchLost(userId, match)
  )
}

export function getWonMatchesPointsDifferential(
  userId: string,
  matches: LeagueMatch[],
  leagueId: number
): number {
  const wonMatches = getWonMatches(userId, getPlayerMatches(userId, leagueId, matches))
  let differential = 0

  for (const match of wonMatches) {
    differential += Math.abs(match.player1Score - match.player2Score)
  }

  return differential
}

export function getWonMatchesDifferential(
  userId: string,
  matches: LeagueMatch[],
  leagueId: number
): number {
  const wonMatches = getWonMatches(userId, getPlayerMatches(userId, leagueId, matches))
  const lostMatches = getLostMatches(userId, getPlayerMatches(userId, leagueId, matches))

  return Math.abs(wonMatches.length - lostMatches.length)
}

export function sortMatchesByPoints(
  a: LeagueAssignedUser,
  b: LeagueAssignedUser,
  leagueMatches: LeagueMatch[],
  leagueId: number
): number {
  const aPlayerWonMatchesDifferential = getWonMatchesDifferential(
    a.discordUserId,
    leagueMatches,
    leagueId
  )

  const bPlayerWonMatchesDifferential = getWonMatchesDifferential(
    b.discordUserId,
    leagueMatches,
    leagueId
  )

  if (aPlayerWonMatchesDifferential !== bPlayerWonMatchesDifferential) {
    return aPlayerWonMatchesDifferential > bPlayerWonMatchesDifferential ? -1 : 1
  }

  const aPlayerWonRoundsAmount = getWonMatchesPointsDifferential(
    a.discordUserId,
    leagueMatches,
    leagueId
  )
  const bPlayerWonRoundsAmount = getWonMatchesPointsDifferential(
    b.discordUserId,
    leagueMatches,
    leagueId
  )

  return aPlayerWonRoundsAmount > bPlayerWonRoundsAmount ? -1 : 1
}
