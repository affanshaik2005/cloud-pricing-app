import { Database } from 'sqlite3';

export interface Instance {
  id: string;
  cloud_type: string;
  region: string;
  instance_type: string;
  cpu: number;
  ram: number;
  price: number;
  unit: string;
  price_per_unit: number;
}

export class InstanceModel {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async findAll(filters: any): Promise<Instance[]> {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM instances 
        WHERE cloud_type = ? 
        AND region = ?
        AND ram >= ? 
        AND ram <= ?
        AND cpu >= ? 
        AND cpu <= ?
      `;
      
      const maxRam = filters.maxRam || 9999;
      const maxCpu = filters.maxCpu || 9999;
      
      this.db.all(query, 
        [
          'AWS',
          'eu-west-1',
          parseInt(filters.minRam) || 0,
          parseInt(maxRam),
          parseInt(filters.minCpu) || 0,
          parseInt(maxCpu)
        ],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows as Instance[]);
        }
      );
    });
  }
}