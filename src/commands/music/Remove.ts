import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class Remove extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "remove",
            description: {
                content: "cmd.remove.description",
                examples: ["remove 1"],
                usage: "remove <song number>",
            },
            category: "music",
            aliases: ["rm"],
            cooldown: 3,
            args: true,
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
            options: [
                {
                    name: "song",
                    description: "cmd.remove.options.song",
                    type: 4,
                    required: true,
                },
            ],
        });
    }

    public async run(client: heemusic, ctx: Context, args: string[]): Promise<any> {
        const player = client.queue.get(ctx.guild!.id);
        const embed = this.client.embed();

        if (!player.queue.length)
            return await ctx.sendMessage({
                embeds: [embed.setColor(this.client.color.red).setDescription(ctx.locale("cmd.remove.errors.no_songs"))],
            });

        const songNumber = Number(args[0]);
        if (isNaN(songNumber) || songNumber <= 0 || songNumber > player.queue.length)
            return await ctx.sendMessage({
                embeds: [embed.setColor(this.client.color.red).setDescription(ctx.locale("cmd.remove.errors.invalid_number"))],
            });

        player.remove(songNumber - 1);
        return await ctx.sendMessage({
            embeds: [embed.setColor(this.client.color.main).setDescription(ctx.locale("cmd.remove.messages.removed", { songNumber }))],
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
