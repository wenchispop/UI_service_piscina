import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  formData = {
    nombre: '',
    email: '',
    pedido: '',
    mensaje: '',
  };

  touchedFields: Record<'nombre' | 'email' | 'mensaje', boolean> = {
    nombre: false,
    email: false,
    mensaje: false,
  };

  showSuccessModal = false;

  constructor(private router: Router) {}

  get isFormValid(): boolean {
    return this.hasValue(this.formData.nombre) && this.hasValue(this.formData.email) && this.hasValue(this.formData.mensaje);
  }

  private hasValue(value: string | undefined | null): boolean {
    return typeof value === 'string' && value.trim().length > 0;
  }

  markFieldAsTouched(field: 'nombre' | 'email' | 'mensaje') {
    this.touchedFields[field] = true;
  }

  onSubmit() {
    this.touchedFields = {
      nombre: true,
      email: true,
      mensaje: true,
    };

    if (!this.isFormValid) {
      return;
    }

    this.showSuccessModal = true;
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
    this.router.navigate(['/']);
  }
}

