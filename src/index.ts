import { CustomClient } from "./client";

if (!process.env.BOT_TOKEN) {
    console.log('The BOT_TOKEN environnement variable is missing.')
    process.exit();
}

let client: CustomClient = new CustomClient(process.env.BOT_TOKEN, false);
client.connect()