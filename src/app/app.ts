import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router'; // Importar Router
import { CommonModule } from '@angular/common'; // Importar para el *ngIf
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    Navbar, 
    Footer, 
    CommonModule // <--- Importante para que funcione el *ngIf
  ], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  // EL CAMBIO ESTÁ AQUÍ: debe decir 'public'
  constructor(public router: Router) {} 
}