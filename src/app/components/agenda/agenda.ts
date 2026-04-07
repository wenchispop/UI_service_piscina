import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './agenda.html',
  styleUrl: './agenda.css'
})
export class AgendaComponent {
  listaAgenda = [
    { cliente: 'Condominio Central', tamanoPiscina: 'Grande', fecha: '2026-04-07', estado: 'Pendiente' },
    { cliente: 'Residencial Maipú', tamanoPiscina: 'Mediana', fecha: '2026-04-07', estado: 'En Proceso' }
  ];

  agregarCita(nombre: string, tamano: any, fecha: string) {
    if(!nombre || !tamano || !fecha) return alert("Completa todos los datos");
    
    this.listaAgenda.push({
      cliente: nombre,
      tamanoPiscina: tamano,
      fecha: fecha,
      estado: 'Pendiente'
    });
    alert("Mantención agendada con éxito");
  }
}