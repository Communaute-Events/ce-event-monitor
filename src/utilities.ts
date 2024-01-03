import { Snowflake } from "discord.js-selfbot-v13";

export function isSelfbot(id: Snowflake) {
    return id === String(1171040343404335204)
}