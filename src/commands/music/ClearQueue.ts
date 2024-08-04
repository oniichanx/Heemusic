import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class ClearQueue extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "clearqueue",
            description: {
                content: "cmd.clearqueue.description",
                examples: ["clearqueue"],
                usage: "clearqueue",
            },
            category: "music",
            aliases: ["cq"],
            cooldown: 3,
            args: false,
            vote: false,
            player: {
                voice: true,
                dj: true,
                active: true,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ["SendMessages", "ReadMessageHistory", "ViewChannel", "EmbedLinks"],
                user: [],
            },
            slashCommand: true,
            options: [],
        });
    }

    public async run(client: heemusic, ctx: Context): Promise<any> {
        const player = client.queue.get(ctx.guild!.id);
        const embed = this.client.embed();

        if (!player) {
            return await ctx.sendMessage({
                embeds: [embed.setColor(this.client.color.red).setDescription(ctx.locale("cmd.player.errors.no_player"))],
            });
        }

        if (player.queue.length === 0) {
            return await ctx.sendMessage({
                embeds: [embed.setColor(this.client.color.red).setDescription(ctx.locale("cmd.player.errors.no_songs"))],
            });
        }

        player.queue = [];
        return await ctx.sendMessage({
            embeds: [embed.setColor(this.client.color.main).setDescription(ctx.locale("cmd.clearqueue.messages.cleared"))],
        });
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
