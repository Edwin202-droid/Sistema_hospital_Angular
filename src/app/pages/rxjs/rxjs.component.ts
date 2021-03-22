import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, retry } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;


  constructor() {
    //referencia
    this.subscription = this.regresaObservable().pipe()
    .subscribe(
      numero =>console.log('subs',numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino')  
    );
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }


  regresaObservable():Observable<any>{ 
    return new Observable( (observer : Subscriber<any>) => {

      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;
        //ira al siguiente 1 2 3 4 5 ...
        observer.next(contador);


        /* if(contador === 3 ){
          //una ves llegado al objetivo se termina
          clearInterval (intervalo);
          observer.complete();
        }
 */


        /* //ejemplo imprimir un error
        if(contador === 2){
          //clearInterval (intervalo);
          observer.error('Auxilio'); */
        
      },1000);

      //Pipe map transforma el valor que recibimos ya sea de una api
    })/* .pipe(
      map( resp =>{
        return resp.valor;
      })
    ) */;



  }
 
}
