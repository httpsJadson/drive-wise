import { registerAs } from "@nestjs/config";

export default registerAs('jwt', () => {

    return {
        secret: process.env.JWT_SECRET,
        audi: process.env.JWT_TOKEN_AUDIENCE,
        issuer: process.env.JWT_TOKEN_ISSUE,
        jwtTTL: parseInt(process.env.JWT_TTL as string) ?? 3600,
        jwtRefreshTTL: parseInt(process.env.JWT_REFRESH_TTL as string) ?? 604800,
    }
});
