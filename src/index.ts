
import express from 'express';
import http from 'http';
import { CLIENT_ADDR, PORT } from './consts';
import cors from 'cors';
import { getApolloServer } from './apollo/apolloServer';
import { getConnection } from './db/mysql';

async function main() {
    const app = express();
    const server = http.createServer(app);

    app.use(cors({ origin: CLIENT_ADDR, credentials: true }));

    const connection = await getConnection();
    const apolloServer = await getApolloServer();
    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(PORT);
}

main();