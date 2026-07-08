import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private router: Router) {}

  onSubmit(username: string, password: string, event?: Event) {
    if (event) event.preventDefault();

    const expectedUser = 'user';
    const expectedPass = 'clave';

    if (username === expectedUser && password === expectedPass) {
      alert('ha iniciado sesion exitosamente');
      // redirige a la ruta principal
      this.router.navigate(['']);
    } else {
      alert('usuario o contraseña incorrecta');
    }
  }
}
