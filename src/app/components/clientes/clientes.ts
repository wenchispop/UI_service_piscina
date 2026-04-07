import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes {
  listaClientes = [
    { nombre: 'Inmobiliaria Alameda', rut: '76.123.456-K', plan: 'Mantenimiento Semanal', monto: '180.000', estado: 'Al día' },
    { nombre: 'Condominio El Sol', rut: '77.890.123-4', plan: 'Limpieza Full', monto: '350.000', estado: 'Pendiente' },
    { nombre: 'Hotel Mar Azul', rut: '80.444.555-2', plan: 'Contrato Anual', monto: '1.200.000', estado: 'Al día' },
    { nombre: 'Club de Verano', rut: '70.222.111-0', plan: 'Mantenimiento Básico', monto: '90.000', estado: 'Moroso' }
  ];
}