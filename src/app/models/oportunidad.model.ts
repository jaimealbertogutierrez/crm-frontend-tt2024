  export interface Oportunidad {
    oportunidad_id: number;          // ID único de la oportunidad, clave primaria
    cliente_id: number;              // ID del cliente relacionado
    descripcion: string;              // Descripción de la oportunidad
    estado: 'en progreso' | 'cerrada' | 'perdida'; // Estado de la oportunidad
    fecha_creacion: Date;            // Fecha de creación de la oportunidad
  }
