// client/src/types/index.ts

export interface Instance {
  id: number;
  name: string;
  type: string;
  region: string;
  ram: number;
  cpu: number;
  price: number;
}

export interface FilterParams {
    cloudType?: string;
    region?: string;
    minRam?: number;
    maxRam?: number;
    minCpu?: number;
    maxCpu?: number;
}