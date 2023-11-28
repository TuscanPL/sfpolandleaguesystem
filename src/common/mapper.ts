import type { ConfigurationOption } from '@/models/api/configurationOptionModel'
import type { League, LeagueAssignedUser } from '@/models/app/leagueModel'
import type { UserCookie } from '@/models/app/userCookieModel'
import type { User } from '@/models/app/userModel'

function mapUserCookieToUser(userCookie: UserCookie): User {
  return {
    userId: userCookie.userId,
    email: userCookie.identityData.email,
    avatarUrl: userCookie.identityData.avatarUrl,
    globalName: userCookie.identityData.customClaims.globalName
  }
}

function mapConfigurationOptionDbModelToConfigurationOption(
  configurationOption: any
): ConfigurationOption {
  return {
    id: configurationOption.id,
    configurationKey: configurationOption.configurationKey,
    configurationValue: configurationOption.configurationValue,
    createdAt: new Date(configurationOption.created_at)
  } as ConfigurationOption
}

function mapLeagueDbModelToLeague(league: any): League {
  return {
    id: league.id,
    createdAt: new Date(league.created_at),
    leagueName: league.league_name,
    leagueStartDate: new Date(league.league_start_date),
    leagueEndDate: new Date(league.league_end_date),
    leagueSignUps: league.league_sign_ups.map((user: any) => mapLeagueUserDbModelToLeagueUser(user))
  } as League

  function mapLeagueUserDbModelToLeagueUser(user: any): LeagueAssignedUser {
    return {
      avatarUrl: user.avatar_url,
      createdAt: new Date(user.created_at),
      discordName: user.discord_name,
      id: user.id
    } as LeagueAssignedUser
  }
}

export {
  mapUserCookieToUser,
  mapLeagueDbModelToLeague,
  mapConfigurationOptionDbModelToConfigurationOption
}
