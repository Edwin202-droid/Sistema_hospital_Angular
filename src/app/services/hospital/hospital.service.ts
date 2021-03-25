import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token!:string;

  constructor(public http:HttpClient,
              public _subirArchivoService:SubirArchivoService) { 
                this.cargarStorage();
              } 
  //Para obtener el token del localStorage y asi poder hacer acciones como
  //Borrar, actualizar, etc
  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token')||'{}';
    }else{
      this.token = '';
    }
  }  

  cargarHospitales(){
    let url= URL_SERVICIOS + '/hospitales';

    return this.http.get(url);
  }

  obtenerHospital(id:string){
    let url = URL_SERVICIOS + '/hospitales/' +id;
    return this.http.get(url).pipe(
      map((resp:any)=> resp.hospital)
    );
  }

  buscarHospital(termino:string){

    let url= URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url).pipe(
      map(
        //solo trae a los usuarios
        (resp:any)=>resp.hospitales
      )
    );

  }

  borrarHospital(id:string){

    let url= URL_SERVICIOS + '/hospitales/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url).pipe(
      map(resp=>{
        Swal.fire('Hospital Borrado','El hospital fue borrado','success');
        return true;
      })
    )
  }

  crearHospital(nombre:string){
    let url = URL_SERVICIOS + '/hospitales';
    url+= '?token=' + this.token;

    return this.http.post(url, {nombre})
          .pipe(
            map((resp:any)=>resp.hospital)
          )
  }

  actualizarHospital(hospital:Hospital){

    let url= URL_SERVICIOS  + '/hospitales/' + hospital._id;
    url+='?token=' + this.token;

    return this.http.put(url,hospital)
          .pipe(
            map((resp:any)=>{

              //let usuarioDB: Usuario = resp.usuario;
              Swal.fire('Hospital actualizado',hospital.nombre,'success');
              return resp.hospital;
            })
          )
  }

}
