import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService, Producto } from '../../services/cart.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  link?: string; // NUEVO: Añadido enlace opcional para el ruteo
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements OnInit, OnDestroy {
  esAdmin = false;
  currentSlide = 0;
  private autoPlayTimer: any;

  // Diapositivas para el carrusel superior grande con sus enlaces de redirección correctos
  slides: Slide[] = [
    {
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=80',
      title: 'Compra tus Insumos de Piscinas aquí',
      subtitle: 'Sistema integral para la gestión de ventas de insumos de piscinas',
      link: '/tienda'
    },
    {
      image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1600&q=80',
      title: 'Mantenciones Profesionales a tu Alcance',
      subtitle: 'Agenda visitas técnicas y mantén el agua de tu piscina cristalina todo el año.',
      link: '/agenda'
    },
    {
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
      title: 'Equipamiento de Alta Tecnología',
      subtitle: 'Bombas, filtros y químicos certificados con despacho rápido a domicilio.',
      link: '/insumos' // MODIFICADO: Asegura el correcto direccionamiento al panel
    }
  ];

  constructor(
    private authService: AuthService,
    private cartService: CartService 
  ) {}

  ngOnInit() {
    this.authService.isAdmin$.subscribe(status => {
      this.esAdmin = status;
    });
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayTimer = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  agregarAlCarro(nombre: string, precio: number, imagen: string) {
    const producto: Producto = {
      id: Date.now(),
      nombre: nombre,
      precio: precio,
      imagen: imagen,
      categoria: 'Insumos'
    };
    this.cartService.addToCart(producto);
  }
}