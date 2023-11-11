# CE Events Monitor

A selfbot that will monitor discord servers from a list of sources (see [sources.ts](https://github.com/Communaute-Events/ce-event-monitor/blob/main/src/sources.ts)).

It will host a WebSocket server, and broadcast a message for each detected events containing information about it.
Example:
```json
{"_type":"event","eventSource":{"name":"Server name here)","guildId":"00000000000","admins":["00000000000"],"roles":["00000000000"]},"message":{"data":{"channelId":"00000000000","guildId":"00000000000","id":"00000000000","position":null,"createdTimestamp":00000000000,"type":"<type>","system":false,"content":"Message content here","authorId":"00000000000","pinned":false,"tts":false,"nonce":"00000000000","embeds":[],"components":[],"attachments":[],"stickers":[],"editedTimestamp":null,"mentions":{"everyone":false,"users":[],"roles":["00000000000"],"crosspostedChannels":[],"repliedUser":null,"members":[],"channels":[]},"webhookId":null,"groupActivityApplicationId":null,"applicationId":null,"activity":null,"flags":0,"reference":null,"interaction":null,"cleanContent":"Clean content (format displayed in the app)"},"url":"https://discord.com/channels/00000000000/00000000000/00000000000"},"author":{"name":"Username","author":"00000000000"},"guild":{"name":"My events server","id":"00000000000"},"timeStamp":"2023-11-10T20:43:48.609Z"}
```

Please note that the bot cannot join servers automatically and needs to be added manually to them.