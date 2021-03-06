import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/services.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  usuario!: Usuario;

  constructor(public _usuarioService:UsuarioService,
              public router:Router) { }

  ngOnInit(): void {
    //Del servicio usuarios, sacamos al usuario
    this.usuario= this._usuarioService.usuario;
  }

  buscar(termino:string){

    this.router.navigate(['/busqueda', termino]);

  }

  

}
