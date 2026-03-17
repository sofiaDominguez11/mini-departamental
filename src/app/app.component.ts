import { Component } from '@angular/core';
import { 
  IonApp, IonRouterOutlet, IonMenu, IonHeader, 
  IonToolbar, IonTitle, IonContent, IonList, 
  IonItem, IonIcon, IonLabel, IonMenuToggle 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, peopleOutline, cartOutline, logOutOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-menu contentId="main-content">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Menú Walmart</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-menu-toggle auto-hide="false" *ngFor="let p of paginas">
              <ion-item [routerLink]="[p.url]" lines="none" detail="false">
                <ion-icon slot="start" [name]="p.icon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>

      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-app>
  `,
  standalone: true,
  imports: [
    IonApp, IonRouterOutlet, IonMenu, IonHeader, 
    IonToolbar, IonTitle, IonContent, IonList, 
    IonItem, IonIcon, IonLabel, IonMenuToggle,
    RouterModule, CommonModule
  ],
})
export class AppComponent {
  // Lista de páginas para navegar (Requerimiento de menú funcional [cite: 55, 64])
  public paginas = [
    { title: 'Inicio', url: '/home', icon: 'home-outline' },
    { title: 'Carrito', url: '/carrito', icon: 'cart-outline' },
    { title: 'Nuestro Equipo', url: '/equipo', icon: 'people-outline' },
    { title: 'Cerrar Sesión', url: '/login', icon: 'log-out-outline' }
  ];

  constructor() {
    addIcons({ homeOutline, peopleOutline, cartOutline, logOutOutline });
  }
}