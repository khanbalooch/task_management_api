import * as dotenv from 'dotenv';
import { getEnvString, toNumber } from './utils';
import path from 'path';

enum APP_ENV {
    DEVELOPMENT = 'development',
    TEST = 'test',
    STAGING = 'staging',
    PRODUCTION = 'production',
}


const getEnvFile = (appEnv: string | undefined) => (process.env.NODE_ENV === 'test' ? 'env.test' : appEnv && Object.keys(APP_ENV).includes(appEnv.toUpperCase())  ? `${appEnv.toLowerCase()}.env` : '.env');
const envFile = getEnvFile(process.env.NODE_ENV);

dotenv.config({ path: path.join( process.cwd(), envFile ) });
console.log('ENV file used', envFile);


export const env = {
    node: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isTest: process.env.NODE_ENV === 'test',
    isStaging: process.env.NODE_ENV === 'staging',
    isProduction: process.env.NODE_ENV || 'productrion',

    app: {
        prefix: getEnvString('APP_PREFIX'),
        port: toNumber(getEnvString('APP_PORT')),
        dirs: {
            controllers: getEnvString('CONTROLLERS_DIR'),
            middlewares: getEnvString('MIDDLEWARES_DIR'),
        },
        
    }
}