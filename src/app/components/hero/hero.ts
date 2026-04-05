import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-hero',
  imports: [Navbar, Footer],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {}
