 import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Formulario } from './formulario';

describe('Formulario', () => {
  let component: Formulario;
  let fixture: ComponentFixture<Formulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formulario, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Formulario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit when required fields are empty', () => {
    component.formData = {
      nombre: '   ',
      email: '   ',
      pedido: '',
      mensaje: '   ',
    };

    component.onSubmit();

    expect(component.showSuccessModal).toBeFalsy();
  });

  it('should show confirmation when required fields are filled', () => {
    component.formData = {
      nombre: 'Ana',
      email: 'ana@test.com',
      pedido: '123',
      mensaje: 'Necesito ayuda',
    };

    component.onSubmit();

    expect(component.showSuccessModal).toBeTruthy();
  });
});
