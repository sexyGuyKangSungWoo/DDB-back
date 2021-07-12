import { createConnection, Connection } from 'typeorm';
import { MYSQL_ADDR, MYSQL_DATABASE, MYSQL_PORT } from '../consts';
import { User } from '../entities/User';
import { MYSQL_PASSWORD, MYSQL_USERNAME } from '../secret';

export async function getConnection() {
    const connection = await createConnection({
        type: 'mysql',
        host: MYSQL_ADDR,
        port: MYSQL_PORT,
        username: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,

        entities: [
            User
        ],

        migrationsRun: true
    });

    return connection;
}