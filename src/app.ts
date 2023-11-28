import { Application } from './lib/Application';
import { env } from './env';

(async function bootStrapApplication(){
    let app = new Application();
    let server = await app.start();
    console.log('Application Started', env);
})();
