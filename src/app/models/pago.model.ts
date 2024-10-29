export interface Pago {
  pago_id: number;                             // ID único del pago, clave primaria
  cliente_id: number;                          // ID del cliente relacionado
  fecha_pago: Date;                            // Fecha del pago
  monto: number;                               // Monto del pago
  metodo_pago: 'transferencia' | 'tarjeta';   // Método de pago
}
