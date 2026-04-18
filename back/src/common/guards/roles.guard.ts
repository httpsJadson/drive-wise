import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUEST_TOKEN_PAYLOAD_KEY } from "../../auth/auth.constants";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { JobRole } from '../enum/jobRole.enum';
import { ROLES_HIERARCHY } from '../utils/jobRoles.hierarch';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [
        context.getHandler(),
        context.getClass(),
      ],
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request[REQUEST_TOKEN_PAYLOAD_KEY];

    if (!user) throw new ForbiddenException('User not authenticated');
    const availableRoles = ROLES_HIERARCHY[user.role as JobRole] || [];
    const hasPermission = requiredRoles.some(role => 
      availableRoles.includes(role as JobRole)
    );

    if (!hasPermission) {
      throw new ForbiddenException('Your role does not have permission for this action');
    }

    return true;
  }
}