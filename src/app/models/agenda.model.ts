export interface Agendamiento {
  cliente: string;
  fecha: string;
  tamanoPiscina: 'Pequeña' | 'Mediana' | 'Grande' | 'Olímpica';
  tecnico: string;
  estado: 'Pendiente' | 'En Proceso' | 'Finalizado';
}