import { Request, Response } from 'express';
import { InstanceModel } from '../models/Instance';
import { Database } from 'sqlite3';

export class InstancesController {
    private instanceModel: InstanceModel;

    constructor(db: Database) {
        this.instanceModel = new InstanceModel(db);
    }

    async getInstances(req: Request, res: Response): Promise<void> {
        try {
            console.log('Received filter params:', req.query); // Debug log

            const filters = {
                minRam: Number(req.query.minRam) || 0,
                maxRam: Number(req.query.maxRam) || Number.MAX_SAFE_INTEGER,
                minCpu: Number(req.query.minCpu) || 0,
                maxCpu: Number(req.query.maxCpu) || Number.MAX_SAFE_INTEGER,
            };

            console.log('Processed filters:', filters); // Debug log
            
            const instances = await this.instanceModel.findAll(filters);
            console.log(`Found ${instances.length} instances`); // Debug log
            
            res.json(instances);
        } catch (error) {
            console.error('Error in getInstances:', error);
            res.status(500).json({ error: 'Failed to fetch instances' });
        }
    }
}