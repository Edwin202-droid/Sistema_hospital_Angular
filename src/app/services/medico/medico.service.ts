import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos:number=0;

  constructor(public http:HttpClient,
              public _usuarioServices:UsuarioService) { }

  //Para obtener el token del localStorage y asi poder hacer acciones como
  //Borrar, actualizar, etc

  cargarMedicos(){
    let url = URL_SERVICIOS + '/medicos' 

    return this.http.get(url).pipe(
      map((resp:any)=>{
        this.totalMedicos = resp.total;
        return resp.medicos
      })
    );
  }

  buscarMedicos(termino:string){

    let url= URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url).pipe(
      map(
        //solo trae a los usuarios
        (resp:any)=>resp.medicos 
      )
    );
  }

  borrarMedico(id:string){

    let url=URL_SERVICIOS + '/medicos/' + id;
    url += '?token=' + this._usuarioServices.token;

    return this.http.delete(url).pipe(
      map(resp=>{
        Swal.fire('Medico borrado', 'Medico borrado correctamente','success');
        return true;
      })
    );

  }

  //Como llamamos solo a este servicio, aqui implementamos tanto el crear como actualizar
  guardarMedico(medico:Medico){

    let url = URL_SERVICIOS + '/medicos';

    if(medico._id){
      //actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioServices.token;

      return this.http.put(url,medico).pipe(
        map((resp:any)=>{
          Swal.fire('Medico actualizado', medico.nombre,'success');
          return resp.medico;
        })
      );

      
    }else{
      //creando
      url += '?token=' + this._usuarioServices.token;

      return this.http.post(url,medico).pipe(
          map((resp:any)=>{
            Swal.fire('Medico Creado', medico.nombre,'success');
            return resp.medico;
          })
        );
    }
  }

  cargarUnMedico(id:string){
    let url = URL_SERVICIOS + '/medicos/' + id;

    return this.http.get(url).pipe(
      map((resp:any)=> resp.medico)
    );
  }

}
