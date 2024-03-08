export interface Claim {
    tokenType: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
}