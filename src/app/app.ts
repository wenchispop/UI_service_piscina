import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Agregarlos aquí
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {}