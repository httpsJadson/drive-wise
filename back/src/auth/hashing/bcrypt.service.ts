import { HashingServiceProtocol } from "../hashing/hashing.service";
import bcrypt from 'bcryptjs';

export class BcryptService extends HashingServiceProtocol{
    
    async hash(password: string): Promise<string>{
        return await bcrypt.hash(password, 10);
    }
    async compare(password: string, passwordHash: string): Promise<boolean>{
        return await bcrypt.compare(password, passwordHash);
    }
}