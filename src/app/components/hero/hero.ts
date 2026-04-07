import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [CommonModule,RouterModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})

export class HeroComponent implements OnInit {
  esAdmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Nos suscribimos para que 'esAdmin' cambie automáticamente
    this.authService.isAdmin$.subscribe(status => {
      this.esAdmin = status;
    });
  }
}
