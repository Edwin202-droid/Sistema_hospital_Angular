import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

import { SidebarService, UsuarioService } from 'src/app/services/services.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  usuario!: Usuario;

  constructor( public _sidebar:SidebarService,
                public _usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.usuario= this._usuarioService.usuario;
  }

}
