import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 
// Importamos los componentes específicos para Standalone
import { 
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, 
  IonContent, IonList, IonItem, IonThumbnail, IonLabel, 
  IonBadge, IonNote, IonFooter, IonButton, IonIcon,
  AlertController, LoadingController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cartOutline } from 'ionicons/icons';
import { DataService } from '../services/data'; 

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  // Aquí listamos cada componente que usas en el HTML
  imports: [
    CommonModule, CurrencyPipe, RouterModule,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, 
    IonContent, IonList, IonItem, IonThumbnail, IonLabel, 
    IonBadge, IonNote, IonFooter, IonButton, IonIcon
  ]
})
export class CarritoPage implements OnInit {
  public dataService = inject(DataService);
  private alertCtrl = inject(AlertController);
  private loadingCtrl = inject(LoadingController);
  private router = inject(Router);

  items: any[] = [];

  constructor() {
    // Registramos el icono para que no salga el cuadro blanco
    addIcons({ cartOutline });
  }

  ngOnInit() {
    this.refreshCarrito();
  }

  // Método para asegurar que los datos estén frescos
  refreshCarrito() {
    this.items = this.dataService.getCarrito();
  }

  get total() {
    return this.items.reduce((acc, item) => acc + (item.price * (item.cantidad || 1)), 0);
  }

  async simularPago() {
    console.log('Iniciando proceso de pago...');
    
    const loading = await this.loadingCtrl.create({
      message: 'Procesando pago en Walmart...',
      spinner: 'crescent', // Este es más ligero para Android
      duration: 2000
    });
    
    await loading.present();

    // Usamos el handler de dismiss para asegurar el orden
    loading.onDidDismiss().then(async () => {
      const alert = await this.alertCtrl.create({
        header: '¡Pago Exitoso!',
        subHeader: 'Walmart agradece tu compra',
        message: `Tu pedido por $${this.total.toFixed(2)} ha sido confirmado.`,
        backdropDismiss: false,
        buttons: [{
          text: 'Entendido',
          handler: () => {
            this.dataService.vaciarCarrito(); 
            this.items = [];
            this.router.navigate(['/home']);
          }
        }]
      });
      await alert.present();
    });
  }
}