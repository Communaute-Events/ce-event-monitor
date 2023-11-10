import "dotenv/config"

import { isSelfbot } from "./utilities";
import { Client } from 'discord.js-selfbot-v13'
import { WebSocketServer } from 'ws';
import { EventSources } from "./sources";

const client = new Client({
    checkUpdate: false
});

const wss = new WebSocketServer({
    port: process.env.port,
})

wss.on('connection',ws=>{
    ws.send(`{"_type":"status","status":"online","timestamp":"${new Date().toISOString()}"}`)
})

client.once('ready', async () => {
    console.log(`${client.user.username} is ready!`);
})

client.on("messageCreate", async (msg) => {
    if (isSelfbot(msg.author.id)) { return }
    EventSources.forEach((source) => {
        if (
            source.admins.includes(msg.author.id) && msg.guild.id == source.guildId && /* Checks if the msg is from an admin in the event source*/ 
            (source.roles.map(roleId => msg.content.includes(roleId)) || msg.content.includes("@everyone") || msg.content.includes("@here")) /* Checks if the msg pings an event role or @everyone/here*/
        ) {
            wss.clients.forEach(client=> {
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
                        id: msg.guild.id
                    },
                    timeStamp: new Date().toISOString()
                }))
            })
        }
    })
})

client.login(process.env.token);