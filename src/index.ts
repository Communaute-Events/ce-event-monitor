import "dotenv/config"

import { isSelfbot } from "./utilities";
import { Client } from 'discord.js-selfbot-v13'
import { WebSocketServer } from 'ws';
import fs from "fs"

let EventSources = JSON.parse(fs.readFileSync("data/sources.json","utf-8") || "[]")
fetch("https://raw.githubusercontent.com/Communaute-Events/ce-event-monitor/main/data/sources.json").then(res => res.json().then(res => {
    EventSources = res
})).catch(err => {
    console.log("[Event Monitor] An error occured while fetching event sources. The data/sources.json file will be used.\n\n" + err)
})

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
    console.log(`[Event Monitor] ${client.user.username} is ready!`);
})

client.on("messageCreate", async (msg) => {
    if (isSelfbot(msg.author.id)) { return; }
    EventSources.forEach((source) => {
        // If the message is in the event source and the author is an admin
        if (msg.guild.id === source.guildId && source.admins.includes(msg.author.id) && source.channels.includes(msg.channel.id)) {
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