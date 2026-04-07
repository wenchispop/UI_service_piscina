import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la app
})
export class AuthService {
  // El BehaviorSubject guarda el estado (false = usuario normal)
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  
  // Este es el "canal" al que se suscribirán el Navbar y el Hero
  isAdmin$ = this.isAdminSubject.asObservable();

  // Método para cambiar el valor
  setAdminMode(status: boolean) {
    this.isAdminSubject.next(status);
  }
}