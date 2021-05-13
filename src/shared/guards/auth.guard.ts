import { loggerInstance } from './../../logger/index';
import { LeanDocument } from 'mongoose';
import { SystemsService } from './../../systems/systems.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { SystemDocument } from 'src/systems/systems.schema';

@Injectable()
export class PatAuthGuard implements CanActivate {
  constructor(private systemsService: SystemsService) {}

  getUserNameAndPassword(b64: string): { username: string; password: string } {
    const credentials = Buffer.from(b64, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    return { username, password };
  }

  updateSystem(system: LeanDocument<SystemDocument>) {
    const id = system._id;
    if (system.usedTimes) {
      system.usedTimes.push(Date.now().toString());
    } else {
      system.usedTimes = [Date.now().toString()];
    }

    return this.systemsService.update(id, system);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    request.user = await this.validateToken(request.headers.authorization);
    return true;
  }

  private async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Basic') {
      throw new UnauthorizedException();
    }
    const token = auth.split(' ')[1];
    try {
      const { username, password } = this.getUserNameAndPassword(token);
      const system = await this.systemsService.findOneWithUsername(username);
      if (system && system.pat === password) {
        await this.updateSystem(system);
        return system;
      }
      throw new UnauthorizedException();
    } catch (error) {
      loggerInstance.log(error, 'error', 'PATAuthentication');
      const message = error.name || error.message || 'Token malformed';
      throw new HttpException(
        error.response || message,
        error.status || HttpStatus.FORBIDDEN,
      );
    }
  }
}
