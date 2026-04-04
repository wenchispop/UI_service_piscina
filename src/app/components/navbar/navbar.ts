import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importante para usar directivas

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  // Por defecto empezamos como usuario común
  isAdmin: boolean = false;

  // Función para el botón del switch
  toggleRole() {
    this.isAdmin = !this.isAdmin;
  }
}