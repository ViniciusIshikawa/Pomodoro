import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public cronometro: any = null;
  public segundos: number = 0;
  public minutos: number = 25;

  constructor() {

  }

  ngOnInit(): void {

  }

  public comecar() {
    if(this.cronometro === null) {
      console.log('começou');
      this.cronometro = setInterval(() => {
        if(this.segundos === 0) {
          this.minutos -= 1;

          if(this.minutos === 0) {
            clearInterval(this.cronometro);
            return;
          }

          this.segundos = 60;
        }

        this.segundos -= 1;
      }, 1000);
    }
}

  public pausar() {
    if(this.cronometro !== null) {
      console.log('pausou');
      clearInterval(this.cronometro);
      this.cronometro = null;
    }
  }

  public marcar() {

  }
}
