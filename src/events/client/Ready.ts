import config from "../../config.js";
import { Event, type heemusic } from "../../structures/index.js";

export default class Ready extends Event {
    constructor(client: heemusic, file: string) {
        super(client, file, {
            name: "ready",
        });
    }
    
    // biome-ignore lint/suspicious/useAwait: <explanation>
    public async run(): Promise<void> {
        this.client.logger.success(`${this.client.user?.tag} is ready!`);
        this.client.user?.setPresence({
            activities: [
                {
                    name: config.botActivity,
                    type: config.botActivityType,
                },
            ],
            status: config.botStatus as any,
        });
    }
}

/**
 * Project: heemusic
 * Author: oniichanx
 * Company: ArchGG
 * Copyright (c) 2024. All rights reserved.
 * This code is the property of ArchGG and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/heelee
 */
