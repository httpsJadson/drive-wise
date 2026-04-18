import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";
import { Request } from "express";
import { REQUEST_TOKEN_PAYLOAD_KEY } from "../../auth/auth.constants";
import jwtConfig from "../../auth/config/jwt.config";

@Injectable()
export class AuthTokenGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ReturnType<typeof jwtConfig>,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extracTokenFromHeader(request);
        if(!token){
            throw new UnauthorizedException( "Invalid token" );
        }
        try {

            const payload = await this.jwtService.verifyAsync(
                token,
                this.jwtConfiguration,

            );
            request[REQUEST_TOKEN_PAYLOAD_KEY] = payload;

        } catch (error: any) {
            throw new UnauthorizedException(error.message);
        }
        return true
    }

    extracTokenFromHeader(request: Request): string | undefined {
       const authorization = request.headers?.authorization;
       if(!authorization || typeof authorization !== "string"){
        return undefined;
       }
       const token = authorization.split(' ')[1] ?? authorization.split(' ')[0];
       return token;
    }
}