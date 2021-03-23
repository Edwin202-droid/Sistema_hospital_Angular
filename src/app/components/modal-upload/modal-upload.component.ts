import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

  imagenSubir!: File;
  imagenTemp!:string;

  constructor(  public _subirArchivoService:SubirArchivoService,
                public _modalUploadService:ModalUploadService ) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imagenTemp=null as any;
    this.imagenSubir= null as any;
    this._modalUploadService.ocultarModal();
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
  
  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)  
        .then(resp=>{
          this._modalUploadService.notificacion.emit(resp);
          this.cerrarModal();
        })
        .catch(err=>{
          console.log('Error en la carga...');
          
        })

         
  }

}
