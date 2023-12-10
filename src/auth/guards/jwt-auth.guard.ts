import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(){
        super();
    };

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const canActivate = super.canActivate(context);
        const canActivatePromise = canActivate as Promise<boolean>;
        if(typeof canActivate === 'boolean'){
            return  canActivate
        }
        return canActivatePromise.catch((error)=>{
            throw new UnauthorizedException(error.message)
        }); 
    }
}
