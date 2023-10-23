import requireAll from 'require-all';
import { validate } from 'class-validator';
import { ValidatorOptions } from 'class-validator';

export function getEnvString(key: string): string {
    return process.env[key] || '';
}

export function toNumber(value: string): number {
    return parseInt(value, 10) ;
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
