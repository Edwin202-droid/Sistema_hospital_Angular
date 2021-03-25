import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

declare var swal:any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  //Como arreglo ya que lo meteremos en una tabla
  hospitales:Hospital[]=[];
  totalHospitales:number=0;
  cargando:boolean=true;

  constructor(public _hospitalServices:HospitalService,
              public _modalUploadService:ModalUploadService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this._modalUploadService.notificacion
        .subscribe(()=>this.cargarHospitales());
  }

  cargarHospitales(){

    this.cargando=true;
    this._hospitalServices.cargarHospitales()
        .subscribe((resp:any)=>{
          this.hospitales=resp.hospitales;
          this.totalHospitales=resp.total;

          this.cargando=false;
        });
  }
  buscarHospital(termino:string){
    //Si la caja esta vacia muestra todo
    if(termino.length <= 0){
      this.cargarHospitales();
      return;
    }
    this.cargando=true;
    this._hospitalServices.buscarHospital(termino)
        .subscribe((hospital:Hospital[])=>{
          this.hospitales=hospital;
          this.cargando=false;
        })
  }

  borrarHospital(hospital:Hospital){

    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Seguro de borrar a ' + hospital.nombre,
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result)=>{
      if(result.isConfirmed){
        this._hospitalServices.borrarHospital(hospital._id || '{}')
                          .subscribe(borrado=>{
                            this.cargarHospitales();
                          });
      }
    })
  }

  crearHospital(){

    swal({
      title:'Crear Hospital',
      text:'Ingrese el nombre del hospital',
      content:'input',
      icon:'info',
      buttons:true,
      dangerMode:true
    }).then((valor:string) => {
      if(!valor || valor.length === 0){
        return;
      }

      this._hospitalServices.crearHospital(valor)
          .subscribe(()=>this.cargarHospitales())
    });

  }

  actualizarHospital(hospital:Hospital){
    this._hospitalServices.actualizarHospital(hospital)
        .subscribe();
  }

  actualizarImagen(hospital:Hospital){
    this._modalUploadService.mostrarModal('hospitales',hospital._id||'{}');
  }

}
