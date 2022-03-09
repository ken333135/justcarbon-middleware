import * as moduleAlias from 'module-alias';
const sourcePath = 'src';
moduleAlias.addAliases({
    '@server': `${sourcePath}`,
    '@config': `${sourcePath}/config`,
})

require('dotenv').config()

import { createServer } from './config/express';
import { AddressInfo } from 'net';
import http from 'http';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '5000';

const startServer = async () => {

    const app = await createServer();
    const server = http.createServer(app).listen({ host, port }, () => {

        const addressInfo = server.address() as AddressInfo;
        console.log(`Server ready at http://${addressInfo.address}:${addressInfo.port}`)

    })
}

startServer();