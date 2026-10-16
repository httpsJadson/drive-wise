import { registerAs } from "@nestjs/config";

export default registerAs('jwt', () => {

    return {
        secret: process.env.JWT_SECRET,
        audi: process.env.JWT_TOKEN_AUDIENCE,
        issuer: process.env.JWT_TOKEN_ISSUE,
        // `??` não cobre esse caso: parseInt(undefined) é NaN, e NaN não é
        // nullish, então o fallback nunca era aplicado quando as env vars
        // não estavam definidas — o login quebrava com "expiresIn should be
        // a number of seconds or string representing a timespan".
        jwtTTL: parseInt(process.env.JWT_TTL as string) || 3600,
        jwtRefreshTTL: parseInt(process.env.JWT_REFRESH_TTL as string) || 604800,
    }
});
