import requireAll from 'require-all';

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
