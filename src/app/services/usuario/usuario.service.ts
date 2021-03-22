import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario!: Usuario;
  token!: string;

  constructor(public http:HttpClient,
              public router:Router) { 
    this.cargarStorage();
  }

  //Si esta logeado, tiene un token
  estaLogueado(){
    return (this.token.length > 5)? true : false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token')||'{}';
      this.usuario= JSON.parse(localStorage.getItem('usuario')||'{}');
    }else{
      this.token = '';
      this.usuario = null as any;
    }
  }

  guardarStorage(id: string, token: string, usuario:Usuario){
    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
    localStorage.setItem('usuario',JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  logOut(){
    this.usuario= null as any;
    this.token='';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }


  loginGoogle(token:string){

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token})
                .pipe(
                  map((resp:any)=>{
                    this.guardarStorage(resp.id, resp.token, resp.usuario);
                    return true;
                  })
                )

  }

  login(usuario: Usuario, recordar: boolean = false){

    let url = URL_SERVICIOS + '/login';

    if(recordar){
      localStorage.setItem('email',usuario.email);
    }else{
      localStorage.removeItem('email');  
    }

    return this.http.post(url, usuario)
    //regresa info, para guardar info. trabajamos con el map
            .pipe(
            map((resp:any)=>{
              /* localStorage.setItem('id',resp.id);
              localStorage.setItem('token',resp.token);
              localStorage.setItem('usuario',JSON.stringify(resp.usuario)); */

              this.guardarStorage(resp.id, resp.token, resp.usuario);
              return true;
              })
            )
  }

  crearUsuario(usuario:Usuario){

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
          .pipe(
            map((resp:any) =>{
              Swal.fire('Usuario creado',usuario.email, 'success');
              return resp.usuario;
            })
          )

  }
}