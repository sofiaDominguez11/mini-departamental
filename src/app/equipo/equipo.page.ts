import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class EquipoPage implements OnInit {

  // Puedes crear una lista de integrantes para imprimirla con un *ngFor en el HTML
  integrantes = [
    { nombre: 'Tu Nombre Completo', matricula: 'Tú Matrícula' },
    { nombre: 'Compañero 2', matricula: 'Matrícula 2' },
    { nombre: 'Compañero 3', matricula: 'Matrícula 3' },
    // Agrega al cuarto si aplica
  ];

  constructor() { }

  ngOnInit() {
  }
}