import type { UserCookie } from "@/models/app/userCookieModel";
import type { User } from "@/models/app/userModel";

function mapUserCookieToUser(userCookie: UserCookie): User {
    return {
        userId: userCookie.userId,
        email: userCookie.identityData.email,
        avatarUrl: userCookie.identityData.avatarUrl,
        globalName: userCookie.identityData.customClaims.globalName
    }
}

export {
    mapUserCookieToUser
}