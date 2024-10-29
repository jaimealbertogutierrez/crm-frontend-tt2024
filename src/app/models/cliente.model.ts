export interface Cliente {
  cliente_id: number;         // ID único del cliente, clave primaria
  nombre: string;             // Nombre del cliente
  direccion?: string;         // Dirección del cliente (opcional)
  correo_electronico?: string; // Correo electrónico del cliente (opcional)
  telefono?: string;          // Teléfono del cliente (opcional)
}
