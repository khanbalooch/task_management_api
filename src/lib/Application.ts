import express, { Application as ExpressApplication } from 'express';
import { env } from '../env';
import { loadClassesfromDir } from '../utils';

export class Application {
    private app: ExpressApplication;

    constructor() {
        this.app = express();
        this.initMiddlewares();
        this.initControllers();
    }

    private initMiddlewares() {
        const middlewares = loadClassesfromDir(env.app.dirs.middlewares, /(.+Middleware)\.ts$/);
        middlewares.forEach( middleware => {
            this.app.use((new middleware()).use);
        });
    }

    private initControllers() {
        const controllers = loadClassesfromDir(env.app.dirs.controllers, /(.+Controller)\.ts$/);
        controllers.forEach( controller => {
            this.app.use(env.app.prefix, (new controller()).router);
        });
    }

    public async start() {
        return this.app.listen(env.app.port);
    }
}
