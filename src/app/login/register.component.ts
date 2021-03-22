import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/services.index';

declare function init_plugins():any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma!: FormGroup;

  constructor(public _usuarioService:UsuarioService,
              public router:Router) { }

  /* sonIguales( campo1: string, campo2: string){

    return (group:FormGroup) => {

      let pass1= group.controls[campo1].value;
      let pass2= group.controls[campo2].value;

      if(pass1===pass2){
        //la regla de validacion pasa
        return null;
      }
      //esto impide que el formulario sea valido
      return {
        sonIguales:true
      };
    };

  } */
sonIguales = (control: AbstractControl)=>{

    const newPassword = control.get('password');
    const confirmPassword = control.get('password2');
    // if no values, valid
    if (!newPassword || !confirmPassword) {
      return null;
    } 
    // if values match return null, else 'mismatchedPasswords:true'  
    return newPassword.value === confirmPassword.value ? null : { mismatchedPasswords: true };
  }
   
  ngOnInit(): void {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl('', Validators.required),
      correo: new FormControl( '', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      condiciones: new FormControl(false)
    }, {validators: this.sonIguales } );
  }

  registrarUsuario(){

    if(this.forma.invalid){ return;}

    if(!this.forma.value.condiciones){
      Swal.fire('Importante','Debe aceptar condiciones', 'warning');
      console.log('Debe aceptar condiciones');
      return;
    }
    //console.log(this.forma.valid);
    console.log(this.forma.value);

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario).subscribe(resp=>{
      //console.log(resp);
      this.router.navigate(['/login']);
      //En este momento ya tengo al usuario en la base de datos
    })
  }

}
