import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class LowPass extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "lowpass",
            description: {
                content: "Toggle the lowpass filter on/off",
                examples: ["lowpass"],
                usage: "lowpass <number>",
            },
            category: "filters",
            aliases: ["lp"],
            cooldown: 3,
            args: false,
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
            options: [],
        });
    }
    
    public async run(client: heemusic, ctx: Context): Promise<any> {
        const player = client.queue.get(ctx.guild.id);

        const filterEnabled = player.filters.includes("lowpass");

        if (filterEnabled) {
            player.player.setLowPass({}); //TODO
            player.filters = player.filters.filter((filter) => filter !== "lowpass");
            ctx.sendMessage({
                embeds: [
                    {
                        description: "Lowpass filter has been disabled",
                        color: client.color.main,
                    },
                ],
            });
        } else {
            player.player.setLowPass({ smoothing: 20 });
            player.filters.push("lowpass");
            ctx.sendMessage({
                embeds: [
                    {
                        description: "Lowpass filter has been enabled",
                        color: client.color.main,
                    },
                ],
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