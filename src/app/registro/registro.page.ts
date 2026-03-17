import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Para navegar
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonIcon 
} from '@ionic/angular/standalone'; // Importamos los componentes que usaremos en el HTML
import { addIcons } from 'ionicons'; // Para los iconos
import { personAddOutline } from 'ionicons/icons';
import { DataService } from '../services/data'; // Tu servicio

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonInput, 
    IonButton, 
    IonIcon,
    CommonModule, 
    FormsModule,
    RouterModule
  ]
})
export class RegistroPage implements OnInit {
  // Inyectamos lo necesario
  private dataService = inject(DataService);
  private router = inject(Router);

  // Modelo para el registro
  newUser = { email: '', password: '' };

  constructor() {
    // Registramos el icono que vamos a usar
    addIcons({ personAddOutline });
  }

  ngOnInit() {}

  registrar() {
    // Validación básica: que no estén vacíos
    if(this.newUser.email && this.newUser.password) {
      // Guardamos en el servicio (Centralizamos la data)
      this.dataService.guardarUsuario(this.newUser);
      
      alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
      
      // Mandamos al usuario al Login
      this.router.navigate(['/login']);
    } else {
      alert('Por favor, rellena todos los campos.');
    }
  }
}