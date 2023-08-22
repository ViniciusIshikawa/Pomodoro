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
  public minutos: number = 0;
  public tempoInterval: number = 1000;

  public tipoCronometro: string = "";
  public titulo: string = "";

  public listaTempo: string[] = [];

  constructor() {

  }

  ngOnInit(): void {

  }

  public comecar() {
    if(this.tipoCronometro == "") {
      alert("Selecione o tipo de crônometro!");
      return;
    }

    if(this.cronometro !== null) {
      clearInterval(this.cronometro);
      this.cronometro = null;
    }

    if(this.tipoCronometro == "trabalho") {
      if(this.cronometro === null) {
        console.log("começou");
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
        }, this.tempoInterval);
      }
    } else if(this.tipoCronometro = "descanso") {
      if(this.cronometro === null) {
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
        }, this.tempoInterval);
      }
    }
  }

  public trabalhar() {
    this.tipoCronometro = "trabalho";
    this.titulo = "Foco"
    this.minutos = 25;
    this.segundos = 0;
  }

  public descansar() {
    this.tipoCronometro = "descanso";
    this.titulo = "Decanse";
    this.segundos = 0;
    this.minutos = 5;
  }

  public pausar() {
    if(this.cronometro !== null) {
      //console.log('pausou');
      clearInterval(this.cronometro);
      this.cronometro = null;
    }
  }

  public marcar() {
    //console.log(this.listaTempo);
    this.listaTempo.push(this.minutos + ":" + this.segundos);
  }

  public zerar() {
    clearInterval(this.cronometro);
    this.cronometro = null;

    if(this.tipoCronometro == "trabalho") {
      this.segundos = 0;
      this.minutos = 25;
    } else if(this.tipoCronometro == "descanso") {
      this.segundos = 0;
      this.minutos = 5;
    }

  }
}
