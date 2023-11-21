import type { UserCookie } from "@/models/app/userCookieModel"

function getUserCookie(): string | null {
    return localStorage.getItem('sb-szdfoftdifsvtiacvxuw-auth-token')
}

function getMappedUserCookie(): UserCookie | null {
    const stringifiedCookie = getUserCookie()
    if (stringifiedCookie === null) {
        return null
    }
    
    const data = JSON.parse(stringifiedCookie);
    const userCookieData = data.user.identities.filter((identity: any) => {
        if (identity.provider === 'discord')
            return identity;
    })[0];
    
    if (userCookieData === undefined)
        return null;

    return {
        userId: userCookieData.user_id,
        provider: userCookieData.provider,
        lastSignInAt: userCookieData.last_sign_in_at,
        createdAt: userCookieData.created_at,
        updatedAt: userCookieData.updated_at,
        id: userCookieData.id,
        identityData: {
            avatarUrl: userCookieData.identity_data.avatar_url,
            email: userCookieData.identity_data.email,
            emailVerified: userCookieData.identity_data.email_verified,
            fullName: userCookieData.identity_data.full_name,
            iss: userCookieData.identity_data.iss,
            name: userCookieData.identity_data.name,
            phoneVerified: userCookieData.identity_data.phone_verified,
            picture: userCookieData.identity_data.picture,
            providerId: userCookieData.identity_data.provider_id,
            sub: userCookieData.identity_data.sub,
            customClaims: {
                globalName: userCookieData.identity_data.custom_claims.global_name
            },

        }
    } as UserCookie
}

export { getUserCookie, getMappedUserCookie }