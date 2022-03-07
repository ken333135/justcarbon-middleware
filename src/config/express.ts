import express from 'express';
import cors from 'cors';

const routes = require('../routes');

const createServer = (): express.Application => {

    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(express.json());

    app.use('/api', routes);

    return app;
}

export { createServer }