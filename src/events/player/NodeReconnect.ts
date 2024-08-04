import { Event, type heemusic } from "../../structures/index.js";
import BotLog from "../../utils/BotLog.js";

export default class NodeReconnect extends Event {
    constructor(client: heemusic, file: string) {
        super(client, file, {
            name: "nodeReconnect",
        });
    }

    // biome-ignore lint/suspicious/useAwait: <explanation>
    public async run(node: string): Promise<void> {
        const message = `Node ${node} reconnected`;
        this.client.logger.warn(message);
        BotLog.send(this.client, message, "warn");
    }
}

/**
 * Project: heemusic
 * Author: oniichanx
 * Main Contributor: oniichanx
 * Company: ArchGG
 * Copyright (c) 2024. All rights reserved.
 * This code is the property of ArchGG and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/heelee
 */
