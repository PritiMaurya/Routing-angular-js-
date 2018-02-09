import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild
{
  constructor(private authService: AuthService,private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
    return this.authService.isAuthenticate().then(
      (authenticate: boolean)=>
      {
        if(authenticate)
        {
          return true;
        }
        else {
            this.router.navigate(['/']);
        }
      }
    )
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
    return this.canActivate(route,state)
  }
}
