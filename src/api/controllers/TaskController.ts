import { Request, Response, Router } from 'express';
import { RoutingController } from '../../lib/RoutingController';

const TASKS_PATH = '/tasks';

export class TaskController extends RoutingController {

    initRoutes(): any {
        this.router.get(TASKS_PATH, this.getAllTasks);
    }

    public async getAllTasks(req: Request, res: Response): Promise<any> {
        console.log('Get all Tasks');
        return res.status(200).send({ result: 'success' });
    }

}
