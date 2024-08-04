import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class DeletePlaylist extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "delete",
            description: {
                content: "cmd.delete.description",
                examples: ["delete <playlist name>"],
                usage: "delete <playlist name>",
            },
            category: "playlist",
            aliases: ["del"],
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
                    name: "playlist",
                    description: "cmd.delete.options.playlist",
                    type: 3,
                    required: true,
                },
            ],
        });
    }

    public async run(client: heemusic, ctx: Context, args: string[]): Promise<any> {
        const playlistName = args.join(" ").trim();
        const embed = this.client.embed();

        const playlistExists = await client.db.getPlaylist(ctx.author.id, playlistName);
        if (!playlistExists) {
            return await ctx.sendMessage({
                embeds: [embed.setDescription(ctx.locale("cmd.delete.messages.playlist_not_found")).setColor(this.client.color.red)],
            });
        }

        await client.db.deletePlaylist(ctx.author.id, playlistName);
        return await ctx.sendMessage({
            embeds: [
                embed
                    .setDescription(ctx.locale("cmd.delete.messages.playlist_deleted", { playlistName }))
                    .setColor(this.client.color.green),
            ],
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
