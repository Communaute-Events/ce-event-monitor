import { Snowflake } from "discord.js";

export function isSelfbot(id: Snowflake) {
    return id === String(1171040343404335204)
}