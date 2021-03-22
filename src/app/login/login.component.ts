import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/services.index';

declare function init_plugins():any;
//Google -> libreria Gapi
declare const gapi : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email!: string;
  //Google
  auth2: any;

  constructor(public router: Router,
              public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    //ngonint -> esto se dispara cada ves que entramos en la pagina
    init_plugins();
    this.googleInit();

    this.email= localStorage.getItem('email') || '';
    if(this.email.length > 1){
      this.recuerdame=true;
    }
  }

  googleInit(){

    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({

        client_id: '456406644783-7bh96s75n22jisbuug77e1vkehlvcne2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    });
  }

  attachSignin(element: any){

    this.auth2.attachClickHandler(element, {}, (googleUser: { getAuthResponse: () => any; })=>{
      /*Obteniedo info del perfil del usuario 
        let profile = googleUser.getBasicProfile();
      */

      //Obtenemos el token de google
      let token= googleUser.getAuthResponse().id_token;

      //inyectamos el servicio y obtenemos token de la bd
      this._usuarioService.loginGoogle(token)
            .subscribe(resp =>{
              console.log(resp);
              /* this.router.navigate(['/dashboard']); */
              window.location.href = '#/dashboard';
            });  
      
    });

  }



  ingresar(forma:NgForm){ 

    if(forma.invalid){return;}

    let usuario = new Usuario( '' , forma.value.email,forma.value.password );

    this._usuarioService.login(usuario, forma.value.recuerdame)
                        .subscribe(resp =>{
                          //si es todo valido, ingresamos al dashboard
                          this.router.navigate(['/dashboard']);
                        });

    console.log(forma.valid);
    console.log(forma.value);
    


    //this.router.navigate(['/dashboard'])
  }

}
