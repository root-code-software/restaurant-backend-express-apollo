const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const errorHandler = require('errorhandler');
const validator = require('express-validator');
const helmet = require('helmet');
const methodOverride = require('method-override');
const morgan = require('morgan');
const responseTime = require('response-time');
const logger = require('../util/logger');

const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = process.env.APP_URLS.split(',');

module.exports = (app) => {

// Enable if you're behind a reverse proxy (Heroku in our case)
// see https://expressjs.com/en/guide/behind-proxies.html
    app.set('trust proxy', 1);
    app.disable('x-powered-by');
    app.use(responseTime());
    app.use(helmet());
    app.use(cors({
    // origin: function (_origin, callback) {
    //     callback(null, true)

    // },
        origin: (origin, next) => {
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                next(null, true);
            } else {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin: ';
                next(new Error(msg,origin));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'X-Access-Token', 'cookinat-api-key', 'cookinat-api-jwt'],
        preflightContinue: false
    }));

    // Used to extract info and pass it to wiston
    app.use(morgan(':remote-addr - :remote-user ":method :url HTTP/:http-version" status: :status :res[content-length] - :response-time ms ":referrer" ":user-agent"', {
        stream: logger.stream
    }));

    app.use(compression());
    app.use(bodyParser.json({limit: '5mb'}));
    app.use(bodyParser.json({type: 'application/vnd.api+json'}));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(validator());
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use((req, res, next) => {
        if (isProduction && !(req.secure || req.headers['x-forwarded-proto'] === 'https')) {
            res.redirect(`https://${req.hostname}:${process.env.PORT_HTTPS}${req.url}`);
        } else {
            next();
        }
    });

    if (!isProduction) {
        app.use(errorHandler({log: errorNotification}));
    }

    function errorNotification(err, str, req) {
        const title = `Error in ${req.method} ${req.url}`;
        logger.error(title, str);
    };

    app.get('*', function (req, _res, next) {
    if (process.env.NODE_ENV !== 'production') {
        logger.info(req.url)
    }
    return next();
});
};
