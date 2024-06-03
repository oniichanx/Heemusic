import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class Grab extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "grab",
            description: {
                content: "Grabs the current playing song",
                examples: ["grab"],
                usage: "grab",
            },
            category: "music",
            aliases: [],
            cooldown: 3,
            args: false,
            player: {
                voice: false,
                dj: false,
                active: true,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ["SendMessages", "ViewChannel", "EmbedLinks"],
                user: [],
            },
            slashCommand: true,
            options: [],
        });
    }
    public async run(client: heemusic, ctx: Context): Promise<any> {
        const embed = this.client.embed().setColor(this.client.color.main);
        const player = client.queue.get(ctx.guild.id);

        const song = player.current;

        try {
            const dm = this.client
                .embed()
                .setTitle(`**${song.info.title}**`)
                .setURL(song.info.uri)
                .setThumbnail(song.info.artworkUrl)
                .setDescription(
                    `**Duration:** ${song.info.isStream ? "LIVE" : client.utils.formatTime(song.info.length)}\n` +
                        `**ชายผู้สั่งให้ผมเริ่มดูดไข่ โดยนาย:** ${song.info.requester}\n` +
                        `**Link:** [Click here](${song.info.uri})`,
                )
                .setColor(this.client.color.main);
                
            await ctx.author.send({ embeds: [dm] });
            return await ctx.sendMessage({
                embeds: [embed.setDescription("I sent you a DM.").setColor(this.client.color.green)],
            });
        } catch (_e) {
            return await ctx.sendMessage({
                embeds: [embed.setDescription(`I couldn't send you a DM.`).setColor(this.client.color.red)],
            });
        }
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