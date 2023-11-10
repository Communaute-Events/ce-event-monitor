import { isSelfbot } from "./utilities";

const { Client, WebhookClient } = require('discord.js-selfbot-v13');
const Config = require("../config/config.json");
const client = new Client({
    checkUpdate: false
});

const webhookClient = new WebhookClient({ url: Config.webhook })

client.once('ready', async () => {
    console.log(`${client.user.username} is ready!`);
})

client.on("messageCreate", async(msg) => {
    if (isSelfbot(msg.author.id)) { return }
    if (Config.adminIds.some((userId) => msg.author.id === userId) && (msg.content.includes("@everyone") || msg.content.includes("@here") || Config.eventRoles.some((roleId) => msg.content.includes(`<@&${roleId}>`)))) {
        const embed = {
            title: `<:alert:1171141887009239070> Nouvel Event! (${msg.guild.name})`,
            color: 14427686,
            description: `Un event à été détecté!\n\n**Serveur:** ${msg.guild.name}\n**Organisateur:** ${msg.author.displayName}`,
            thumbnail: {
                url: msg.guild.iconURL() || "https://i.pinimg.com/originals/3c/6c/cb/3c6ccb83716d1e4fb91d3082f6b21d77.png"
            }
        }
        const embed2 = {
            description: `>>> ${msg.content}\n\n**Pour ne pas louper des informations, rendez-vous ici: ${msg.url}**`,
            color: 14368832,
            timestamp: new Date().toISOString(),
        }
        webhookClient.send({
            content: "<@&1112132727475544144>",
            username: "Event Alerts",
            avatarURL: "https://i.imgur.com/tbjLyKE.png",
            embeds: [embed, embed2]
        })
        console.log(`New event at: ${new Date().toISOString()} from the server: ${msg.guild.name}`)
    }
})

client.login(Config.token);