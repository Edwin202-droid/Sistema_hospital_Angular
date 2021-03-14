import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
   
  @ViewChild('txtInput') txtInput: any;

  @Input()leyenda: string = 'Leyenda';
  @Input()progreso: number = 50;

  //Vamos a emitir un numero, a enviarlo
  @Output()CambioValor: EventEmitter<number> = new EventEmitter();



  constructor() { }

  ngOnInit(): void {
  }
//validaciones en el input, evitar errores
  onChanges( newValue : number){

    /* //fuerza a que el valor de la barra sea igual al del placeholder
    let elemtHTML:any = document.getElementsByName('progreso')[0]; */



    //esto valida que solo se muestren del 0 al 100
    if(newValue >= 100){
      this.progreso = 100;
    } else if (newValue <= 0){
      this.progreso = 0;
    }else{
      this.progreso = newValue;
    }

    //elemtHTML.value= this.progreso;
    this.txtInput.nativeElement.value= this.progreso;
    this.CambioValor.emit(this.progreso);

  

  }

  cambiarValor(valor:number){

    if(this.progreso >= 100 && valor > 0 ){
      this.progreso = 100;
      return;}
    if(this.progreso <= 0 && valor <0) {
      this.progreso = 0;
      return;}
    this.progreso = this.progreso + valor;
      //voy a mandar el valor numero que tenga en este momento
    this.CambioValor.emit(this.progreso);

     //establecer foco
     this.txtInput.nativeElement.focus();
  }

}
