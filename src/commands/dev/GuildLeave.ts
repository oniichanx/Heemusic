import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class GuildLeave extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "guildleave",
            description: {
                content: "Leave a guild",
                examples: ["guildleave <guildId>"],
                usage: "guildleave <guildId>",
            },
            category: "dev",
            aliases: ["gl"],
            cooldown: 3,
            args: true,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: true,
                client: ["SendMessages", "ReadMessageHistory", "ViewChannel", "EmbedLinks"],
                user: [],
            },
            slashCommand: false,
            options: [],
        });
    }

    public async run(client: heemusic, ctx: Context, args: string[]): Promise<any> {
        const guildId = args[0];
        const guild = client.guilds.cache.get(guildId);
        if (!guild) return await ctx.sendMessage("Guild not found.");
        try {
            await guild.leave();
            await ctx.sendMessage(`Left guild ${guild.name}`);
        } catch {
            await ctx.sendMessage(`Failed to leave guild ${guild.name}`);
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
