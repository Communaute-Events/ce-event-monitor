export interface EventSource {
    name: string,
    guildId: string,
    admins: string[],
    roles: string[]
}

export const EventSources: EventSource[] = [
    {
        name: "Évenement - FuzeIII",
        guildId: "833066646737780778",
        admins: [
            "165038038509027329", // FuzeIII
            "773175706145652747", // Aywen
            "252237757076865024", // Pinpin
            "967117433997496380", // Thomas (dofmine)
            "268108606027726849", // Zallom
        ],
        roles: [
            "1062143522209275904", // Notif. Short
            "1062174287554953226", // Notif. Crash Test
        ]
    },
    {
        name: "Origaming Studios (Dev)",
        guildId: "***REMOVED***",
        admins: [
            "***REMOVED***", // Origaming
        ],
        roles: [
            "***REMOVED***", // Notif. Crash Test
        ]
    }
]