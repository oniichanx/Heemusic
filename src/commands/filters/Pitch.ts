import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class Pitch extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "pitch",
            description: {
                content: "Toggle the pitch filter on/off",
                examples: ["pitch 1", "pitch 1.5", "pitch 1,5"],
                usage: "pitch <number>",
            },
            category: "filters",
            aliases: ["ph"],
            cooldown: 3,
            args: true,
            player: {
                voice: true,
                dj: true,
                active: true,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ["SendMessages", "ViewChannel", "EmbedLinks"],
                user: ["ManageGuild"],
            },
            slashCommand: true,
            options: [
                {
                    name: "number",
                    description: "The number you want to set the pitch to (between 1 and 5)",
                    type: 3,
                    required: true,
                },
            ],
        });
    }

    public async run(client: heemusic, ctx: Context, args: string[]): Promise<any> {
        const player = client.queue.get(ctx.guild.id);

        const numberString = args[0].replace(",", ".");

        const isValidNumber = /^[0-9]*\.?[0-9]+$/.test(numberString);
        const number = parseFloat(numberString);

        if (!isValidNumber || isNaN(number) || number < 1 || number > 5) {
            return await ctx.sendMessage({
                embeds: [
                    {
                        description: "Please provide a valid number between 1 and 5",
                        color: this.client.color.red,
                    },
                ],
            });
        }

        player.player.setTimescale({ pitch: number, rate: 1, speed: 1 });

        return await ctx.sendMessage({
            embeds: [
                {
                    description: `Pitch has been set to ${number}`,
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