# CE Events Monitor
<div align="center">
    <img src="https://github.com/Communaute-Events/ce-event-monitor/assets/74014262/042bc495-6107-4605-8da5-da79440cf1d6" style="width:30%;">
</div>

---

A selfbot that will monitor discord servers from a list of sources (see [sources.json](https://github.com/Communaute-Events/ce-event-monitor/blob/main/data/sources.json)).

It supports:
    - Maps (links posting)
    - Events (**@everyone**, **@here** pings)
    - and more to come.

It will host a WebSocket server, and broadcast a message for each detected events containing information about it.

## Message format
`_type`: Type of the message (event,map,status,etc...)

`timestamp`: Time of the message

...other dynamic data. Try to connect to the websocket to see how it looks

Please note that the bot cannot join servers automatically and needs to be added manually to them.

## Sources

Sources contain informations about a specifc event server (admins, event roles, event channels, etc...)

### Building

To get a compiled version of the code, run `npm run build`.

### Caution
This is against discord TOS, so use it at your own risk.