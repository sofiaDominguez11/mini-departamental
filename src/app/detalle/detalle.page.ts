import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonMenuButton,
  IonBackButton, 
  IonButton, 
  IonIcon, 
  IonBadge, 
  IonItem, 
  IonLabel, 
  IonText,
  ToastController,
     
  } from '@ionic/angular/standalone'; // Importamos componentes individuales para Standalone
import { addIcons } from 'ionicons'; // Para que los iconos funcionen
import { cartOutline, menu } from 'ionicons/icons';
import { DataService } from '../services/data'; // Verifica que la ruta a tu servicio sea esta
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonMenuButton,
    IonBackButton, 
    IonButton, 
    IonIcon, 
    IonBadge, 
    IonItem, 
    IonLabel, 
    IonText,
    
  ]
})
export class DetallePage implements OnInit {
  // Inyectamos el servicio y el controlador de mensajes (Toast)
  public dataService = inject(DataService);
  private toastCtrl = inject(ToastController);
  
  producto: any;
  stock: number = 0;

  constructor() {
    // Registramos el icono del carrito para que se vea en el botón
    addIcons({ cartOutline });
  }

  ngOnInit() {
    // Obtenemos el producto seleccionado desde el servicio
    this.producto = this.dataService.getProduct();
    // Obtenemos el stock inicial que inventamos en el servicio
    this.stock = this.dataService.getStock();
  }

  async anadirAlCarrito() {
    if (this.stock > 0) {
      // 1. Lo mandamos al arreglo del carrito en el servicio
      this.dataService.agregarAlCarrito(this.producto);
      
      // 2. Bajamos el stock local y avisamos al servicio para que sea realista
      this.stock--;
      this.dataService.actualizarStock();

      // 3. Mostramos la notificación de éxito (Toast)
      const toast = await this.toastCtrl.create({
        message: `¡${this.producto.title} añadido al carrito!`,
        duration: 2000,
        color: 'success',
        position: 'bottom',
        icon: 'cart-outline'
      });
      toast.present();
    }
  }
}