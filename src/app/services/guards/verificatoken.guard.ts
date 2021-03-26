import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificatokenGuard implements CanActivate {

  constructor(public _usuarioService:UsuarioService,
              public router:Router){}

  canActivate(){
    //Aca obtenemos el token del usuario service
    let token= this._usuarioService.token;
    //Obtemeos la info del token: cuando expira, contenido,etc
    let payload = JSON.parse(atob( token.split('.')[1] ));

    let expirado = this.expirado(payload.exp);
    //si el token ya expiro, te saca
    if(expirado){ 
      this.router.navigate(['/login']);
      return false;}

    //si el token esta proximo a vencer

    return this.verificaRenueva(payload.exp)
  }

  verificaRenueva(fechaExp:number):Promise<boolean>{
    return new Promise((resolve,reject)=>{

      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();
      //Si falta mas de 4 horas para que el token termina, renueva
      ahora.setTime(ahora.getTime ()+ (4*60*60**1000));

      if(tokenExp.getTime() > ahora.getTime()){
        resolve(true);
      }else{
        this._usuarioService.renuevaToken().subscribe(
          ()=>{resolve(true);},
          //saldra el swal del error del servicio
          ()=>{reject(false);}
        );
      }


      resolve(true);

    });
  }

  expirado(fechaExp:number) {
    let ahora = new Date().getTime() / 1000;

    if(fechaExp < ahora){
      return true;
    }else{
      return false;
    }
  }

  
}
