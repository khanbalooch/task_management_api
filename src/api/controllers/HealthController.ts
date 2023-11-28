import { NextFunction, Request, Response } from 'express';
import { RoutingController } from '../../lib/RoutingController';

export default class HealthController extends RoutingController {

    initRoutes(): void {
        this.router.get('/health', this.health.bind(this));
    }

    public async health(req: Request, res: Response, next: NextFunction): Promise<any> {
        return res.status(200).send({
            result: 'success',
            converter: true
        });
    }

}
