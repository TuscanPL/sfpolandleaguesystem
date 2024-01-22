export interface League {
  createdAt: Date
  id: number
  leagueName: string
  leagueStartDate: Date
  leagueEndDate: Date
  leagueSignUps: LeagueAssignedUser[],
  leagueStatus: LeagueStatus
}

export interface LeagueAssignedUser {
  avatarUrl: string
  createdAt: Date
  discordName: string
  discordUserId: string
  id: number
}

export enum LeagueStatus {
  Draft = "draft",
  Started = "started",
  Completed = "completed",
}
