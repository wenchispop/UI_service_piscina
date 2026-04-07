import { Component } from '@angular/core';
import { RouterLink, Router, RouterModule } from '@angular/router'; // Importa Router
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isAdmin = false;

  // Agrega "private router: Router" aquí
  constructor(
    private authService: AuthService,
    private router: Router 
  ) {}

  toggleRole() {
    this.isAdmin = !this.isAdmin;
    this.authService.setAdminMode(this.isAdmin);
  }
}