export interface AssetLocation {
    asignacionId: number;
    numeroFormatoEmitido: number;
    ubicacion: string;
    a_QuienSeLeAsigna: string;
    tipo: string;
    createdDate: string;
    createdBy: ''
  }
  
  export interface AssetLocationDetail {
    id: number;
    asignacionBienActivosFijosId: number;
    numero: number;
    placa: string;
    descripcion: string;
    marca: string;
    modelo: string;
    serie: string;
    estadoFisico: string;
    observaciones: string;
    createdDate: string;
    createdBy: string;
  }
