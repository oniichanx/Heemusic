import http from "node:http";
import type { heemusic } from "../../structures/index.js";
import type { BotPlugin } from "../index.js";

const keepAlive: BotPlugin = {
    name: "KeepAlive Plugin",
    version: "1.0.0",
    author: "oniichanx",
    initialize: (client: heemusic) => {
        if (client.config.keepAlive) {
            const server = http.createServer((_req, res) => {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end(`I"m alive! Currently serving ${client.guilds.cache.size} guilds.`);
            });
            server.listen(3000, () => {
                client.logger.info("Keep-Alive server is running on port 3000");
            });
        }
    },
};

export default keepAlive;

/**
 * Project: heemusic
 * Author: oniichanx
 * Company: ArchGG
 * Copyright (c) 2024. All rights reserved.
 * This code is the property of ArchGG and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/heelee
 */