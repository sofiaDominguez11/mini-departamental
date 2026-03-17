import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Agregamos RouterModule
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data'; // 1. IMPORTA TU SERVICIO
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
@Component({ 
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterModule] // Agregamos RouterModule para los enlaces
})
export class LoginPage {

  constructor() {
    // Esto es para que el icono cargue correctamente en modo Standalone
    addIcons({ personCircleOutline });
  }
  private router = inject(Router);
  private dataService = inject(DataService); // 2. INYECTA EL SERVICIO AQUÍ

  user = { email: '', password: '' };

  // 3. REEMPLAZA TU FUNCIÓN POR ESTA
  ingresar() {
    // Obtenemos el usuario que se guardó en la página de registro
    const guardado = this.dataService.getUsuarioRegistrado();
    
    // Validamos que los datos coincidan exactamente
    if (this.user.email === guardado.email && this.user.password === guardado.password && this.user.email !== '') {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales incorrectas o usuario no registrado');
    }
  }
}