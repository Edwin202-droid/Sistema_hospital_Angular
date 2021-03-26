import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  //alli tenemos el usuario y verificar el rol
  constructor(public _usuarioService:UsuarioService){}

  //Validacion desde el Frontend
  canActivate(){
    //si el rol del usuario es admin... PASA
    if(this._usuarioService.usuario.role === 'ADMIN_ROLE'){
      return true;
    }else{
      console.log('Bloqueado por el Guard- Admin');
      //this.router.navigate(['/login']);
      this._usuarioService.logOut();
      return false;  
    }
    //lo usaremos en pages.routes

  }
  
}
