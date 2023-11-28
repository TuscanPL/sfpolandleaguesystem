export interface League {
  createdAt: Date
  id: number
  leagueName: string
  leagueStartDate: Date
  leagueEndDate: Date
  leagueSignUps: LeagueAssignedUser[]
}

export interface LeagueAssignedUser {
  avatarUrl: string
  createdAt: Date
  discordName: string
  discordUserId: string
  id: number
}
