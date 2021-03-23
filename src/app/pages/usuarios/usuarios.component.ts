import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  //Para mostrar los usuarios registrados
  usuarios:Usuario[] = [];
  desde:number = 0;
  totalRegistros: number=0;
  //Para la carga de la pagina
  cargando:boolean =true;

  constructor(public _usuarioService:UsuarioService,
              public _modalUploadService:ModalUploadService) { }

  ngOnInit(): void {
    //
    this.cargarUsuarios(); 

    this._modalUploadService.notificacion
        .subscribe((resp:any)=>{
          this.cargarUsuarios();
        });
  }
  MostrarModal(id:string){
    this._modalUploadService.mostrarModal('usuarios',id);
  }

  cargarUsuarios(){
    //cargando
    this.cargando= true;

    this._usuarioService.cargarUsuarios(this.desde)
            .subscribe((resp:any)=>{
              this.totalRegistros= resp.total;
              this.usuarios=resp.usuarios;
              //termino la carga
              this.cargando=false;
            });
  }

  cambiarDesde(valor:number){ 

    let desde= this.desde + valor;

    if(desde >= this.totalRegistros){
      return;
    }
    if(desde < 0){
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino:string){
    //validacion para cuando no haya nada, que muestre todo
    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }
    //cargando la busqueda
    this.cargando=true;

    this._usuarioService.buscarUsuarios(termino)  
          .subscribe((usuarios:Usuario[])=>{

            console.log(usuarios);
            
            this.usuarios= usuarios;
            //termino la busqueda
            this.cargando=false; 
          });
  }

  borrarUsuario(usuario: Usuario){
    //El usuario que mando si es igual al usuario que esta logado ahora
    if(usuario._id === this._usuarioService.usuario._id){
      Swal.fire('No puede borrar usuario','No se puede borrar a si mismo','error');
      return;
    }

    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Seguro de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result)=>{
      if(result.isConfirmed){
        this._usuarioService.borrarUsuario(usuario._id || '{}')
                          .subscribe(borrado=>{
                            this.cargarUsuarios();
                          });
      }
    })


  }

  guardarUsuario(usuario:Usuario){
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

}
