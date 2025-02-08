import { Router } from 'express';
import { Database } from 'sqlite3';
import { InstancesController } from '../controllers/instances';
import { openDb } from '../db';

const router = Router();
const db = openDb();
const instancesController = new InstancesController(db);

router.get('/instances', (req, res) => instancesController.getInstances(req, res));

export default router;