import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService, MedicoService } from 'src/app/services/services.index';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  hospitales:Hospital[]=[];
  medico:Medico= new Medico('','','','');
  hospital:Hospital= new Hospital('');

  constructor(public _hospitalService:HospitalService,
              public _medicoService:MedicoService,
              public router:Router,
              public activatedRoute:ActivatedRoute,
              public _modalUploadService:ModalUploadService) {

                //activatedRoute:para llenar los espacios con el id recibido
                //pages.routes
                activatedRoute.params.subscribe(params=>{
                  let id = params['id'];

                  //Si el id no es nuevo, mostrar la info del medico a editar
                  if(id !== 'nuevo'){
                    this.cargarUnMedico(id);
                  }

                });
               }

  ngOnInit(): void {
    //Modal -> aqui ya subi la fotografia
    this._modalUploadService.notificacion
        .subscribe((resp:any)=>{
          //actualiza la imagen automaticamente
          this.medico.img=resp.medico.img;
        })

    this._hospitalService.cargarHospitales()
        .subscribe( (resp:any) => this.hospitales = resp.hospitales);
  }

  guardarMedico( f:NgForm ){
    if(f.invalid){return;}

    this._medicoService.guardarMedico(this.medico)
        .subscribe(medico =>{
          console.log(medico);
          //aqui creamos al medico y debemos movernos a su url
          //y aparecera la opcion para introducir fotografia
          this.medico._id= medico._id;
          this.router.navigate(['/medico', medico._id])
        });
  }
//Para mostrar la foto del hospital una vez elegido el hospital
//html -> (change)-$event
  cambioHospital(id:string){
    //Hospital.service -> obtener hospital por id
    this._hospitalService.obtenerHospital(id)
        .subscribe(hospital=>{
          //aqui ya obtenemos toda la info del hospital
          this.hospital=hospital || null as any;
        });
  }

  cargarUnMedico(id:string){
    this._medicoService.cargarUnMedico(id)
      .subscribe(medico => {
        this.medico = medico;
        //para mostrar el hospital en el select del html
        this.medico.hospital = medico.hospital._id;
        //para mostrar la foto del hospital
        this.cambioHospital(this.medico.hospital || '{}');
      });
  }

  //Mando mi info -> luego tengo que suscribirme al modal-notificacion
  //para realizar los cambios
  cambiarFoto(){
    this._modalUploadService.mostrarModal('medicos',this.medico._id || '{}');
  }
}
