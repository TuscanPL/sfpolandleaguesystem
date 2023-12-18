import type { ConfigurationOption } from '@/models/api/configurationOptionModel'
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

export { mapUserCookieToUser, mapConfigurationOptionDbModelToConfigurationOption }
