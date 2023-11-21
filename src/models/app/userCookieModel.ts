export interface UserCookie {
    userId: string;
    identityData: IdentityData;
    provider: string;
    lastSignInAt: string;
    createdAt: string;
    updatedAt: string;
    id: string;
}

interface IdentityData {
    avatarUrl: string;
    customClaims: CustomClaims;
    email: string;
    emailVerified: boolean;
    fullName: string;
    iss: string;
    name: string;
    phoneVerified: boolean;
    picture: string;
    providerId: string;
    sub: string;
}

interface CustomClaims {
    globalName: string;
}