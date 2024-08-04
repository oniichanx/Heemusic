import { Event, type heemusic } from "../../structures/index.js";

export default class NodeRaw extends Event {
    constructor(client: heemusic, file: string) {
        super(client, file, {
            name: "nodeRaw",
        });
    }

    public async run(_payload: any): Promise<void> {
        // Uncomment the following line for debugging purposes
        // this.client.logger.debug(`Node raw event: ${JSON.stringify(payload)}`);
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
