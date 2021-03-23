import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario!: Usuario;
  imagenSubir!: File;
  imagenTemp!:string;

  constructor(public _usuarioService: UsuarioService) { 

    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }


  //Actualizar info de usuario
  guardar(usuario:Usuario){

    this.usuario.nombre= usuario.nombre;
    if(!this.usuario.google){
      this.usuario.email= usuario.email;

    }
    
    this._usuarioService.actualizarUsuario(this.usuario)
                      .subscribe();

  }

  seleccionImage(archivo:File){

    //====Seleccion de imagen a subir====
    if(!archivo){
      this.imagenSubir=null as any;
      return;
    }
    //validar que solo sea imagen 
    if(archivo.type.indexOf('image')<0){
      Swal.fire('Solo Imagenes','El archivo seleccionado no es una imagen','error');
      this.imagenSubir=null as any;
      return;
    }
    this.imagenSubir=archivo;
    //===========================
    //Para colocar la imagen temporal
    let reader = new FileReader();
    let urlImagenTemp= reader.readAsDataURL(archivo);

    reader.onloadend = ()=> this.imagenTemp =  reader.result as string;
  }   

  cambiarImagen(){
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id || '{}');
  }
}
