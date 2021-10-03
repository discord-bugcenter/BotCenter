import { CustomClient } from "./client";

if (!process.env.BOT_TOKEN || !process.env.POSTGRES_PASSWORD) {
    console.log('The BOT_TOKEN or/and the POSTGRES_PASSWORD environnement variable is missing.')
    process.exit();
}

const client: CustomClient = new CustomClient(process.env.BOT_TOKEN, false, false);
client.connect()