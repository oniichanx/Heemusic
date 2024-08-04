import type { TextChannel } from "discord.js";
import type { heemusic } from "../structures/index.js";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export default class BotLog {
    public static send(client: heemusic, message: string, type: "error" | "warn" | "info" | "success" = "info"): void {
        if (!client?.channels.cache && client.config.logChannelId) return;

        const channel = client.channels.cache.get(client.config.logChannelId) as TextChannel;
        if (!channel) return;

        const colors = {
            error: 0xff0000,
            warn: 0xffff00,
            info: 0x00ff00,
            success: 0x00ff00,
        } as const;

        const color = colors[type];
        const embed = client.embed().setColor(color).setDescription(message).setTimestamp();

        channel.send({ embeds: [embed] }).catch(() => {});
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
