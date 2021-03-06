import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from 'src/app/config/config';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable, throwError } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario!: Usuario;
  token!: string;
  menu:any[] = [];

  constructor(public http:HttpClient,
              public router:Router,
              public _subirArchivoService:SubirArchivoService) { 
    this.cargarStorage();
  }

  //Si esta logeado, tiene un token
  estaLogueado(){
    return (this.token.length > 5)? true : false;
  }

  //Renovar token
  renuevaToken(){

    let url = URL_SERVICIOS + '/login/renuevaToken';
    url += '?token=' + this.token;

    return this.http.get( url ).pipe(
      map((resp:any)=>{
        //asignamos nuestra variable token
        this.token = resp.token;
        //y lo mandamos al localStorage
        localStorage.setItem('token',this.token);

        return true;
      }),
      catchError((err:any) =>{
        //Si hay un error en la renovacion, sacamos al usuario
        this.router.navigate(['/login']);
        Swal.fire('No se pudo renovar token','ERROR', 'warning');
        return Observable.throw(err);
      })
    );
  }

  cargarStorage(){
    //si tenemos un token en el localStorage
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token')||'{}';
      this.usuario= JSON.parse(localStorage.getItem('usuario')||'{}');
      this.menu= JSON.parse(localStorage.getItem('menu')||'{}');
    }else{
      this.token = '';
      this.usuario = null as any;
      this.menu= null as any;
    }
  }

  guardarStorage(id: string, token: string, usuario:Usuario, menu:any){
    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
    localStorage.setItem('usuario',JSON.stringify(usuario));
    //guardamos el menu en el storage
    localStorage.setItem('menu',JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    //guardamos en una variable local
    this.menu= menu;
  }

  logOut(){
    this.usuario= null as any;
    this.token='';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }


  loginGoogle(token:string){

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token})
                .pipe(
                  map((resp:any)=>{
                    this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                    //para ver lo que trae el login.router del servidor
                    console.log(resp);
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

              this.guardarStorage(resp.id, resp.token, resp.usuario,resp.menu);
              return true;
              }),
            //Manejo de error usando los mensajes del backend
            catchError((err:any)=>{
              console.log(err.error.mensaje);
              Swal.fire('Error en el Login',err.error.mensaje,'warning');
              return Observable.throw(err);
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
            }),
            //Manejo de error usando los mensajes del backend
            catchError((err:any)=>{
              console.log(err.error.mensaje);

              Swal.fire(err.error.mensaje, err.error.errors.message, 'warning');
              return Observable.throw(err);
            }) 
          )

  }

  actualizarUsuario(usuario:Usuario){
    let url= URL_SERVICIOS  + '/usuario/' + usuario._id;
    url+='?token=' + this.token;

    return this.http.put(url,usuario)
          .pipe(
            map((resp:any)=>{

              if(usuario._id === this.usuario._id){
                this.guardarStorage( resp.usuario._id , this.token, resp.usuario,resp.usuario.menu);
              }
              //let usuarioDB: Usuario = resp.usuario;
              Swal.fire('Usuario actualizado',usuario.nombre,'success');

              return true;
            })
          )
  }

  cambiarImagen(archivo:File, id:string){

    this._subirArchivoService.subirArchivo(archivo,'usuarios',id)
        .then((resp:any)=>{
          this.usuario.img= resp.usuario.img;
          Swal.fire('Imagen actualizada',this.usuario.nombre,'success');
          //actualizar storage
          this.guardarStorage(id,this.token,this.usuario,this.menu);
        })
        .catch(resp=>{

        });
  }

  cargarUsuarios(desde:number=0){
    let url= URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);

  }

  buscarUsuarios(termino:string){

    let url= URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url).pipe(
      map(
        //solo trae a los usuarios
        (resp:any)=>resp.usuarios 
      )
    );
  }

  borrarUsuario(id:string){

    let url = URL_SERVICIOS + '/usuario/' +id;
    url += '?token=' + this.token;

    return this.http.delete(url).pipe(
      map(resp=>{
        Swal.fire('Borrado','El usuario fue borrado','success');
        return true;
      })
    );

  }

}
