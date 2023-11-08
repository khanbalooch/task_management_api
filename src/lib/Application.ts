import express, { Application as ExpressApplication } from 'express';
import { env } from '../env';
import { loadClassesfromDir } from '../utils';
import * as bodyParser from 'body-parser';
import { errorHandlerMiddleware } from '../api/middlewares/errorHandlerMiddleware';
import cors from 'cors';

export class Application {
    private app: ExpressApplication;

    constructor() {
        this.app = express();
        this.initMiddlewares();
        this.initControllers();
        this.initErrorHandler();
    }

    private initMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cors())
        // const middlewares = loadClassesfromDir(env.app.dirs.middlewares, /(.+Middleware)\.ts$/);
        // console.log(middlewares, 'middleware');
        // middlewares.forEach( middleware => {
        //     this.app.use((middleware));
        // });
    }

    private initControllers() {
        const controllers = loadClassesfromDir(env.app.dirs.controllers, /(.+Controller)\.ts$/);
        controllers.forEach( controller => {
            this.app.use(env.app.prefix, (new controller()).router);
        });
    }

    private  initErrorHandler() {
        this.app.use(errorHandlerMiddleware);
    }

    public async start() {
        return this.app.listen(env.app.port);
    }

    public get App(): ExpressApplication {
        return this.app;
    }
}
