import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  usuarios:Usuario[]=[];
  medicos:Medico[]=[];
  hospitales:Hospital[]=[];

  constructor(public activatedRoute: ActivatedRoute,
              public http:HttpClient) { 
    //1. aqui recibimos el termino que mandamos en el header
    activatedRoute.params.subscribe(params =>{
      let termino = params['termino'];
      console.log(termino);
      this.buscar(termino);
    });
  }

  ngOnInit(): void {
  }

  buscar(termino:string){

    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get(url).subscribe((resp:any)=>{
        console.log(resp);
        this.hospitales=resp.hospitales;
        this.medicos=resp.medicos;
        this.usuarios=resp.usuarios
    });

  }

}
