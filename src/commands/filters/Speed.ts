import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class Speed extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "speed",
            description: {
                content: "cmd.speed.description",
                examples: ["speed 1.5", "speed 1,5"],
                usage: "speed <number>",
            },
            category: "filters",
            aliases: ["spd"],
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
                    name: "speed",
                    description: "cmd.speed.options.speed",
                    type: 3,
                    required: true,
                },
            ],
        });
    }

    public async run(client: heemusic, ctx: Context, args: string[]): Promise<any> {
        const player = client.queue.get(ctx.guild!.id);
        const speedString = args[0].replace(",", ".");
        const isValidNumber = /^[0-9]*\.?[0-9]+$/.test(speedString);
        const speed = parseFloat(speedString);

        if (!isValidNumber || isNaN(speed) || speed < 0.5 || speed > 5) {
            await ctx.sendMessage({
                embeds: [
                    {
                        description: ctx.locale("cmd.speed.messages.invalid_number"),
                        color: this.client.color.red,
                    },
                ],
            });
            return;
        }

        player.player.setTimescale({ speed });
        await ctx.sendMessage({
            embeds: [
                {
                    description: ctx.locale("cmd.speed.messages.set_speed", { speed }),
                    color: this.client.color.main,
                },
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
