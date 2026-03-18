import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { RouterModule } from '@angular/router'; // <--- 1. Importa esto
import { cartOutline } from 'ionicons/icons';
import { IonSearchbar } from '@ionic/angular/standalone';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, 
    RouterModule, IonSearchbar]
  //no se me olvide el searchbar
})
export class HomePage implements OnInit {
  public dataService = inject(DataService);
  private router = inject(Router);

 productosFiltrados: any[] = []; // Esta es la que mostrarás en el HTML con el *ngFor
  productos: any[] = [];

  ngOnInit() {
    this.dataService.getProducts().subscribe((res) => {
      this.productosFiltrados = res;
      this.productos = res; // Guardamos la lista original para poder filtrar después
    });
  }

  verDetalle(prod: any) {
    this.dataService.setProduct(prod); // Guardamos en el servicio (10 pts de rúbrica)
    this.router.navigate(['/detalle']);
  }
  
  constructor() {
    addIcons({ cartOutline }); // <--- ¡Sin esto el carrito es invisible!
  }
  buscarProducto(event: any) {  
    const texto  = event.target.value.toLowerCase(); // Convertimos a minúsculas para búsqueda insensible a mayúsculas
    if (texto && texto.trim() !== '') {
    // Filtramos la lista original (this.productos)
    this.productosFiltrados = this.productos.filter((prod: any) => {
      return prod.title.toLowerCase().indexOf(texto) > -1;
    });
  }
  else {
    // Si borra la búsqueda, mostramos todos de nuevo
    this.productosFiltrados = [...this.productos];
  }
}
}