import "reflect-metadata";
import {getConnectionManager} from "typeorm";
import { User, Client, Bot, Bug, Counter } from "./entity";

const HOST = process.env.POSTGRES_HOST || 'localhost';
const PORT = process.env.POSTGRES_POST ? parseInt(process.env.POSTGRES_POST) : 5432;
const PASSWORD = process.env.POSTGRES_PASSWORD;
const USERNAME = process.env.POSTGRES_USER || 'postgres';
const DATABASE = process.env.POSTGRES_DB || USERNAME;

const connectionManager = getConnectionManager();

export const connection = connectionManager.create({
    type: "postgres",
    host: HOST,
    port: PORT,
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    entities: [User, Client, Bot, Bug, Counter],
    synchronize: true
});
