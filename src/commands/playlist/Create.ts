import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class CreatePlaylist extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "create",
            description: {
                content: "cmd.create.description",
                examples: ["create <name>"],
                usage: "create <name>",
            },
            category: "playlist",
            aliases: ["cre"],
            cooldown: 3,
            args: true,
            vote: true,
            player: {
                voice: false,
                dj: false,
                active: false,
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
                    name: "name",
                    description: "cmd.create.options.name",
                    type: 3,
                    required: true,
                },
            ],
        });
    }

    public async run(client: heemusic, ctx: Context, args: string[]): Promise<any> {
        const name = args.join(" ").trim();
        const embed = this.client.embed();

        if (name.length > 50) {
            return await ctx.sendMessage({
                embeds: [embed.setDescription(ctx.locale("cmd.create.messages.name_too_long")).setColor(this.client.color.red)],
            });
        }

        const playlistExists = await client.db.getPlaylist(ctx.author.id, name);
        if (playlistExists) {
            return await ctx.sendMessage({
                embeds: [embed.setDescription(ctx.locale("cmd.create.messages.playlist_exists")).setColor(this.client.color.red)],
            });
        }

        await client.db.createPlaylist(ctx.author.id, name);
        return await ctx.sendMessage({
            embeds: [embed.setDescription(ctx.locale("cmd.create.messages.playlist_created", { name })).setColor(this.client.color.green)],
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
