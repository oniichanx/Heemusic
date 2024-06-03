import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class Rotation extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "rotation",
            description: {
                content: "on/off rotation filter",
                examples: ["rotation"],
                usage: "rotation",
            },
            category: "filters",
            aliases: ["rt"],
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

        if (player.filters.includes("rotation")) {
            player.player.setRotation();
            player.filters.splice(player.filters.indexOf("rotation"), 1);
            ctx.sendMessage({
                embeds: [
                    {
                        description: "Rotation filter has been disabled",
                        color: client.color.main,
                    },
                ],
            });
        } else {
            player.player.setRotation({ rotationHz: 0 });
            player.filters.push("rotation");
            ctx.sendMessage({
                embeds: [
                    {
                        description: "Rotation filter has been enabled",
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