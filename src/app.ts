import { Application } from './lib/Application';

(async function bootStrapApplication(){
    let app = new Application();
    let server = await app.start();
    console.log('Application Started');
})();
