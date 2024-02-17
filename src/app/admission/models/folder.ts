export interface Carpeta {
    nombre: string;
    archivos?: Archivo[];
    expandido?: boolean; // Opcional para controlar la expansión del acordeón
  }
  
export interface Archivo {
    nombre: string;
    tipo: string; // Ejemplo: "pdf", "doc", "imagen"
    tamanio: number;
  }