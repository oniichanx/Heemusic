import { AutoPoster } from "topgg-autoposter";
import config from "../../config.js";
import { Event, type heemusic } from "../../structures/index.js";

export default class Ready extends Event {
    constructor(client: heemusic, file: string) {
        super(client, file, {
            name: "ready",
        });
    }

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

        if (config.topGG) {
            const autoPoster = AutoPoster(config.topGG, this.client);
            setInterval(() => {
                autoPoster.on("posted", (_stats) => {});
            }, 86400000); // 24 hours in milliseconds
        } else {
            this.client.logger.warn("Top.gg token not found. Skipping auto poster.");
        }
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
