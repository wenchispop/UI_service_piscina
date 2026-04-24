import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './agenda.html',
  styleUrl: './agenda.css'
})
export class AgendaComponent implements OnInit {
  
  esAdmin = false;
  
  // Agregamos 'tecnico' a los objetos iniciales para evitar errores visuales
  listaAgenda = [
    { cliente: 'Condominio Central', tamanoPiscina: 'Grande', tecnico: 'Juan Pérez', fecha: '2026-04-07', estado: 'Pendiente' },
    { cliente: 'Residencial Maipú', tamanoPiscina: 'Mediana', tecnico: 'Andrés Soto', fecha: '2026-04-07', estado: 'En Proceso' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Escuchamos el estado del admin desde el servicio
    this.authService.isAdmin$.subscribe(status => {
      this.esAdmin = status;
    });
  }

  // CORRECCIÓN CLAVE: Ahora acepta 4 argumentos (nombre, tamano, fecha, tecnico)
  agregarCita(nombre: string, tamano: string, fecha: string, tecnico: string) {
    if(!nombre || !tamano || !fecha || !tecnico) {
      return alert("Completa todos los datos, incluyendo el operador");
    }
    
    this.listaAgenda.push({
      cliente: nombre,
      tamanoPiscina: tamano,
      tecnico: tecnico, // Guardamos el técnico seleccionado
      fecha: fecha,
      estado: 'Pendiente'
    });
    
    alert(`Mantención agendada con éxito para el técnico ${tecnico}`);
  }

  eliminarCita(index: number) {
    if (this.esAdmin) {
      // Advertencia específica para el Administrador
      const confirmar = confirm("Será borrada la agenda, se informará a la persona que ha solicitado la agenda");
      
      if (confirmar) {
        this.listaAgenda.splice(index, 1);
      }
    } else {
      // Eliminación simple para usuario normal
      if (confirm("¿Estás seguro de que deseas cancelar esta agendación?")) {
        this.listaAgenda.splice(index, 1);
      }
    }
  }
}