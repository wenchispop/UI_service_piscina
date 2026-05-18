import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Insumo {
  id: number;
  nombre: string;
  precio: number | null; // ◄ SOLUCIÓN: Permitimos que sea null mientras se edita
  imagen: string;
  categoria: string;
}

@Component({
  selector: 'app-insumos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './insumos.html',
  styleUrl: './insumos.css',
})
export class Insumos implements OnInit {
  // Tu lista de insumos (se mantiene igual, pero ahora precio es compatible)
  insumos: Insumo[] = [
    {
      id: 1,
      nombre: 'Bomba Vulcano BAE 0.5 HP',
      precio: 189900,
      imagen: 'https://limpiafondos.cl/wp-content/uploads/2025/06/12112100-1-Bomba-Vulcano-BAE-Perfil-600x600.webp',
      categoria: 'Equipamiento'
    },
    {
      id: 2,
      nombre: 'Kit de Limpieza Profesional',
      precio: 36500,
      imagen: 'https://limpiafondos.cl/wp-content/uploads/2025/06/11213202-Kit-Limpieza-Piscina-6x4-Frente-600x600.webp',
      categoria: 'Insumos'
    },
    {
      id: 3,
      nombre: 'Cloro Pastillas triple acción 1kg',
      precio: 11200,
      imagen: 'https://limpiafondos.cl/wp-content/uploads/2025/06/11612100-1-Cloro-Pastilla-600x600.webp',
      categoria: 'Químicos'
    }
  ];

  mostrarModal = false;
  editando = false;

  // Modelo inicializado con null para evitar problemas en el formulario vacío
  insumoForm: Insumo = {
    id: 0,
    nombre: '',
    precio: null, // ◄ Cambiado a null para el formulario limpio
    imagen: '',
    categoria: 'Insumos'
  };

  ngOnInit(): void {}

  abrirModalNuevo() {
    this.editando = false;
    this.insumoForm = {
      id: 0,
      nombre: '',
      precio: null, // ◄ Cambiado a null aquí también
      imagen: '',
      categoria: 'Insumos'
    };
    this.mostrarModal = true;
  }

  abrirModalEditar(insumo: Insumo) {
    this.editando = true;
    this.insumoForm = { ...insumo };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarInsumo() {
    // Validamos que el precio no sea nulo ni menor o igual a cero antes de guardar
    if (!this.insumoForm.nombre || this.insumoForm.precio === null || this.insumoForm.precio <= 0 || !this.insumoForm.imagen) {
      alert('Por favor, rellene todos los campos obligatorios con valores válidos.');
      return;
    }

    if (this.editando) {
      const index = this.insumos.findIndex(item => item.id === this.insumoForm.id);
      if (index !== -1) {
        this.insumos[index] = { ...this.insumoForm };
      }
    } else {
      this.insumoForm.id = Date.now();
      this.insumos.push({ ...this.insumoForm });
    }

    this.cerrarModal();
  }

  eliminarInsumo(id: number) {
    const seguro = confirm('¿Está seguro de que desea eliminar este insumo del catálogo?');
    if (seguro) {
      this.insumos = this.insumos.filter(item => item.id !== id);
    }
  }
}