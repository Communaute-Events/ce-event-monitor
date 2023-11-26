# CE Events Monitor
<img src="https://github.com/Communaute-Events/ce-event-monitor/assets/74014262/042bc495-6107-4605-8da5-da79440cf1d6" style="width:50%;">

A selfbot that will monitor discord servers from a list of sources (see [sources.json](https://github.com/Communaute-Events/ce-event-monitor/blob/main/src/sources.json)).

It will host a WebSocket server, and broadcast a message for each detected events containing information about it.
Example:
```json
{"_type":"event","eventSource":{"name":"Server name here)","guildId":"00000000000","admins":["00000000000"],"roles":["00000000000"]},"message":{"data":{"channelId":"00000000000","guildId":"00000000000","id":"00000000000","position":null,"createdTimestamp":00000000000,"type":"<type>","system":false,"content":"Message content here","authorId":"00000000000","pinned":false,"tts":false,"nonce":"00000000000","embeds":[],"components":[],"attachments":[],"stickers":[],"editedTimestamp":null,"mentions":{"everyone":false,"users":[],"roles":["00000000000"],"crosspostedChannels":[],"repliedUser":null,"members":[],"channels":[]},"webhookId":null,"groupActivityApplicationId":null,"applicationId":null,"activity":null,"flags":0,"reference":null,"interaction":null,"cleanContent":"Clean content (format displayed in the app)"},"url":"https://discord.com/channels/00000000000/00000000000/00000000000"},"author":{"name":"Username","author":"00000000000"},"guild":{"name":"My events server","id":"00000000000"},"timeStamp":"2023-11-10T20:43:48.609Z"}
```

Please note that the bot cannot join servers automatically and needs to be added manually to them.

## Sources

Sources contain informations about a specifc event server (admins, event roles, event channels, etc...)

### Building

To get a compiled version of the code, run `npm run build`. The code is pretty simple so you will only get **3** files.

### Caution
This is against discord TOS, so use it at your own risk.
