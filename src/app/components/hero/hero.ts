import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-hero',
  imports: [Navbar],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {}
