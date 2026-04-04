import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router'; // Necesario para routerLink
import { Navbar } from './navbar'; 

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 1. Importamos el componente (Standalone)
      imports: [Navbar],
      // 2. Proveemos las rutas para que routerLink no de error
      providers: [
        provideRouter([]) 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Reemplaza fixture.whenStable() para inicialización simple
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test opcional para verificar el modo admin que agregamos
  it('should have isAdmin as false by default', () => {
    expect(component.isAdmin).toBeFalsy();
  });
});