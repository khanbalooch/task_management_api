import requireAll from 'require-all';
import { validate } from 'class-validator';
import { ValidatorOptions } from 'class-validator';
import * as path from 'path';
import * as fs from 'fs';

export function getEnvString(key: string): string {
    return process.env[key] || '';
}

export function toNumber(value: string): number {
    return parseInt(value, 10) ;
}

export function getControllersFromDir(): any[] {
    const controllersPath = process.env.NODE_ENV === 'production'
      ? path.resolve(process.cwd(), 'dist/src/api/controllers')
      : path.resolve(process.cwd(), 'src/api/controllers');

    // Get a list of controller files in the directory
    const controllerFiles = fs.readdirSync(controllersPath);
    // Dynamically import and initialize each controller
    return controllerFiles.map((file) => {
      if (file.endsWith('.js') || file.endsWith('.ts')) {
        return require(path.join(controllersPath, file)).default;
        // console.log(Controller)
        // return new Controller();
        // this.app.use('/api', controller.router);
      }
    });
  }

export function loadClassesfromDir(dirname: string, filter: any): any[] {
    const classes: any[] = [];

    const files = requireAll({ dirname, filter });
    Object.keys(files).forEach( file => {
        classes.push(files[file][file]);
    });
    return classes;
}

export async function validateObject(ObjectType: any, data: any, options?: ValidatorOptions) {
    const newObject = new ObjectType();
    Object.assign(newObject, data);
    const errors = await validate(newObject, options);
    return { errors, data: newObject };
}
