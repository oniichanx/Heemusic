import type { Player } from "shoukaku";
import type { Song } from "../../structures/Dispatcher.js";
import { type Dispatcher, Event, type heemusic } from "../../structures/index.js";
import { updateSetup } from "../../utils/SetupSystem.js";

export default class QueueEnd extends Event {
    constructor(client: heemusic, file: string) {
        super(client, file, {
            name: "queueEnd",
        });
    }

    public async run(_player: Player, track: Song, dispatcher: Dispatcher): Promise<void> {
        const guild = this.client.guilds.cache.get(dispatcher.guildId);
        if (!guild) return;

        switch (dispatcher.loop) {
            case "repeat":
                dispatcher.queue.unshift(track);
                break;
            case "queue":
                dispatcher.queue.push(track);
                break;
            case "off":
                dispatcher.previous = dispatcher.current;
                dispatcher.current = null;
                break;
        }

        if (dispatcher.autoplay) {
            await dispatcher.Autoplay(track);
        } else {
            dispatcher.autoplay = false;
        }
        
        await updateSetup(this.client, guild);
        this.client.utils.updateStatus(this.client, guild.id);
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
