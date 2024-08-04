import { Event, type heemusic } from "../../structures/index.js";
import BotLog from "../../utils/BotLog.js";

export default class NodeError extends Event {
    constructor(client: heemusic, file: string) {
        super(client, file, {
            name: "nodeError",
        });
    }

    // biome-ignore lint/suspicious/useAwait: <explanation>
    public async run(node: string, error: any): Promise<void> {
        const errorMessage = JSON.stringify(error, null, 2);
        const message = `Node ${node} Error: ${errorMessage}`;
        this.client.logger.error(message);
        BotLog.send(this.client, message, "error");
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
