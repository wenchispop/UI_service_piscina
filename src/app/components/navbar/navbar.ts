import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public cartService: CartService 
  ) {}

  ngOnInit() {
    this.authService.isAdmin$.subscribe(status => {
      this.isAdmin = status;
    });
  }

  toggleRole() {
    this.isAdmin = !this.isAdmin;
    this.authService.setAdminMode(this.isAdmin);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}