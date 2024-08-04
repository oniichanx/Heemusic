import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class Pitch extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "pitch",
            description: {
                content: "cmd.pitch.description",
                examples: ["pitch 1", "pitch 1.5", "pitch 1,5"],
                usage: "pitch <number>",
            },
            category: "filters",
            aliases: ["ph"],
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
                    name: "pitch",
                    description: "cmd.pitch.options.pitch",
                    type: 3,
                    required: true,
                },
            ],
        });
    }

    public async run(client: heemusic, ctx: Context, args: string[]): Promise<any> {
        const player = client.queue.get(ctx.guild!.id);
        const pitchString = args[0].replace(",", ".");
        const isValidNumber = /^[0-9]*\.?[0-9]+$/.test(pitchString);
        const pitch = parseFloat(pitchString);

        if (!isValidNumber || isNaN(pitch) || pitch < 0.5 || pitch > 5) {
            await ctx.sendMessage({
                embeds: [
                    {
                        description: ctx.locale("cmd.pitch.errors.invalid_number"),
                        color: this.client.color.red,
                    },
                ],
            });
            return;
        }

        await player.player.setTimescale({ pitch });
        await ctx.sendMessage({
            embeds: [
                {
                    description: ctx.locale("cmd.pitch.messages.pitch_set", { pitch }),
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
