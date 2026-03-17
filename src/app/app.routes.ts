import { Routes } from '@angular/router';

export const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'detalle',
    loadComponent: () => import('./detalle/detalle.page').then( m => m.DetallePage)
  },
  {
    path: 'equipo',
    loadComponent: () => import('./equipo/equipo.page').then( m => m.EquipoPage)
  },
  {
    path: 'services',
    loadComponent: () => import('./services/services.page').then( m => m.ServicesPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'carrito',
    loadComponent: ()  => import('./carrito/carrito.page').then( m => m.CarritoPage)
  },
];
