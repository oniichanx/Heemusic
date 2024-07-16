import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class Karaoke extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "karaoke",
            description: {
                content: "Toggle the karaoke filter on/off",
                examples: ["karaoke"],
                usage: "karaoke",
            },
            category: "filters",
            aliases: ["kk"],
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
                user: [],
            },
            slashCommand: true,
            options: [],
        });
    }
    
    public async run(client: heemusic, ctx: Context): Promise<any> {
        const player = client.queue.get(ctx.guild.id);
        const filterEnabled = player.filters.includes("karaoke");
        if (filterEnabled) {
            player.player.setKaraoke();
            player.filters = player.filters.filter((filter) => filter !== "karaoke");
            ctx.sendMessage({
                embeds: [
                    {
                        description: "Karaoke filter has been disabled.",
                        color: client.color.main,
                    },
                ],
            });
        } else {
            player.player.setKaraoke({
                level: 1,
                monoLevel: 1,
                filterBand: 220,
                filterWidth: 100,
            });
            player.filters.push("karaoke");
            ctx.sendMessage({
                embeds: [
                    {
                        description: "Karaoke filter has been enabled.",
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