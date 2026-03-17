import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private apiUrl = 'https://fakestoreapi.com/products';

  // --- SECCIÓN DE USUARIO (Restaurada para corregir el error de compilación) ---
  private registrado = { email: '', password: '' };

  guardarUsuario(user: any) {
    this.registrado = user;
  }

  getUsuarioRegistrado() {
    return this.registrado;
  }

  // --- SECCIÓN DE PRODUCTOS Y CARRITO ---
  private selectedProduct: any;
  private carrito: any[] = [];
  private stockActual: number = Math.floor(Math.random() * 15) + 5; 

  constructor() { }

  // --- MÉTODOS DE LA API ---
  getProducts() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // --- MÉTODOS DEL CARRITO (Lógica de Agrupación por Cantidad) ---
  agregarAlCarrito(producto: any) {
    // 1. Buscamos si el producto ya está en el carrito usando su ID
    const existe = this.carrito.find(p => p.id === producto.id);

    if (existe) {
      // 2. Si ya existe, aumentamos su cantidad
      existe.cantidad += 1;
    } else {
      // 3. Si es nuevo, lo agregamos con cantidad inicial = 1
      this.carrito.push({ ...producto, cantidad: 1, fechaAgregado: new Date() });
    }
    console.log('Items diferentes en carrito:', this.carrito.length);
  }

  getCarrito() {
    return this.carrito;
  }

  // El contador ahora suma todas las cantidades individuales para el badge del carrito
  getContadorCarrito() {
    return this.carrito.reduce((total, item) => total + (item.cantidad || 0), 0);
  }

  vaciarCarrito() {
    this.carrito = [];
  }

  // --- MÉTODOS DE DETALLE Y TRADUCCIÓN ---
  setProduct(product: any) {
    this.selectedProduct = product;
    this.stockActual = Math.floor(Math.random() * 10) + 1;
  }

  getProduct() { return this.selectedProduct; }
  getStock() { return this.stockActual; }
  
  actualizarStock() {
    if (this.stockActual > 0) this.stockActual--;
  }

  traducirCategoria(categoria: string) {
    const nombres: any = {
      "electronics": "Electrónica",
      "jewelery": "Joyería",
      "men's clothing": "Ropa para Caballero",
      "women's clothing": "Ropa para Dama"
    };
    return nombres[categoria] || categoria;
  }
}