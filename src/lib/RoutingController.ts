import { Router } from 'express';

export abstract class RoutingController {
    private _router: Router;

    constructor() {
        this._router = Router();
        this.initRoutes();
    }

    get router() : Router {
        return this._router;
    }

    protected abstract initRoutes(): any;
}
