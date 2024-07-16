import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class Replay extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "replay",
            description: {
                content: "Replays the current track",
                examples: ["replay"],
                usage: "replay",
            },
            category: "music",
            aliases: ["rp"],
            cooldown: 3,
            args: false,
            player: {
                voice: true,
                dj: false,
                active: true,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ["SendMessages", "ViewChannel"],
                user: [],
            },
            slashCommand: true,
            options: [],
        });
    }

    public async run(client: heemusic, ctx: Context): Promise<any> {
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (!player.current?.info.isSeekable) {
            return await ctx.sendMessage({
                embeds: [embed.setColor(this.client.color.red).setDescription("Cannot replay this track as it is not seekable.")],
            });
        }
        player.seek(0);
        return await ctx.sendMessage({
            embeds: [embed.setColor(this.client.color.main).setDescription("Replaying the current track.")],
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