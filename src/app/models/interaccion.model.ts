export interface Interaccion {
  interaccion_id: number;               // ID único de la interacción, clave primaria
  cliente_id: number;                   // ID del cliente relacionado
  fecha_interaccion: Date;              // Fecha de la interacción
  tipo_interaccion: 'llamada' | 'correo electrónico' | 'reunión'; // Tipo de interacción
  notas: string;                         // Notas sobre la interacción
  documento_adjuntos?: string;          // Documentos adjuntos (opcional)
}
