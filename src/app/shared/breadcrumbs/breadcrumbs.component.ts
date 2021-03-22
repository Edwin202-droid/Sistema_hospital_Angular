import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  titulo!: string;

  constructor(  private router: Router,
                private title: Title ) {

      this.getDataRoute().subscribe( data =>{

        console.log(data);
        this.titulo= data.titulo;

        this.title.setTitle(this.titulo);

        //metatag
      });

   }

  ngOnInit(): void {
  }

  getDataRoute(){
      return this.router.events.pipe(

      filter( (evento:any) => evento instanceof ActivationEnd),
      filter( (evento : ActivationEnd) => evento.snapshot.firstChild === null),
      map( (evento:ActivationEnd)=> evento.snapshot.data )
    );
  }

} 
