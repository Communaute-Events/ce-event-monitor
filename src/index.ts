import "dotenv/config"

import { isSelfbot } from "./utilities";
import { Client } from 'discord.js-selfbot-v13'
import { WebSocketServer } from 'ws';
import EventSources from "./sources.json";

const client = new Client({
    checkUpdate: false
});

const wss = new WebSocketServer({
    port: process.env.port,
})

wss.on('connection', ws => {
    ws.send(`{"_type":"status","status":"online","timestamp":"${new Date().toISOString()}"}`)
})

client.once('ready', async () => {
    console.log(`${client.user.username} is ready!`);
})

client.on("messageCreate", async (msg) => {
    if (isSelfbot(msg.author.id)) { return; }
    EventSources.forEach((source) => {
        // If the message is in the event source and the author is an admin
        if (msg.guild.id === source.guildId && source.admins.includes(msg.author.id)) {
            // @ts-expect-error
            // If mentionned role is in source or there is a @everyone/here
            if (source.roles.some(roleId => msg.toJSON().mentions.roles.includes(roleId)) || msg.content.includes("@here") || msg.content.includes("@everyone")) {
                wss.clients.forEach(client => {
                    client.send(JSON.stringify({
                        _type: "event",
                        eventSource: source,
                        message: {
                            data: msg.toJSON(),
                            url: msg.url
                        },
                        author: {
                            name: msg.author.displayName,
                            id: msg.author.id
                        },
                        guild: {
                            name: msg.guild.name,
                            id: msg.guild.id,
                            iconUrl: msg.guild.iconURL()
                        },
                        timeStamp: new Date().toISOString()
                    }));
                });
            }
        }
    })
})
client.login(process.env.token)