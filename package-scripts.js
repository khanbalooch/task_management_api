const { series, rimraf } = require('nps-utils');

module.exports = {
    scripts: {
        default: 'nps start',
        start: {
            script: 'cross-env NODE_ENV=production node dist/src/app.js',
            description: 'starts the builded app'
        },
        serve: {
            script: series('nodemon --watch src --watch .env'),
            description: 'Serves the current app and watches for changes to restart it'
        },
        transpile: {
            script: series('tsc --project ./tsconfig.json')
        },
        setup: {
            script: series('npm install'),
            description: 'Setup the development environment'
        },
        build: {
            script: series(
                // 'nps config',
                'nps clean.dist',
                'nps transpile'
            )
        },
        clean: {
            dist: {
                script: series(
                    'rimraf dist'
                )
            }
        }

    }
};