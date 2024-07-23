import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class DeletePlaylist extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "delete",
            description: {
                content: "Deletes a playlist",
                examples: ["delete <playlist name>"],
                usage: "delete <playlist name>",
            },
            category: "playlist",
            aliases: ["del"],
            cooldown: 3,
            args: true,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ["SendMessages", "ViewChannel", "EmbedLinks"],
                user: [],
            },
            slashCommand: true,
            options: [
                {
                    name: "playlist",
                    description: "The playlist you want to delete",
                    type: 3,
                    required: true,
                },
            ],
        });
    }

    public async run(client: heemusic, ctx: Context, args: string[]): Promise<any> {
        const playlistName = args.join(" ").trim();
        const playlistExists = await client.db.getPlaylist(ctx.author.id, playlistName);
        if (!playlistExists) {
            return await ctx.sendMessage({
                embeds: [
                    {
                        description: "That playlist doesn't exist.",
                        color: this.client.color.red,
                    },
                ],
            });
        }
        client.db.deletePlaylist(ctx.author.id, playlistName);
        return await ctx.sendMessage({
            embeds: [
                {
                    description: `Deleted playlist **${playlistName}.**`,
                    color: this.client.color.main,
                },
            ],
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