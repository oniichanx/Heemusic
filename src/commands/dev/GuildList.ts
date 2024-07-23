import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class GuildList extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "guildlist",
            description: {
                content: "List all guilds the bot is in",
                examples: ["guildlist"],
                usage: "guildlist",
            },
            category: "dev",
            aliases: ["glst"],
            cooldown: 3,
            args: false,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: true,
                client: ["SendMessages", "ViewChannel", "EmbedLinks"],
                user: [],
            },
            slashCommand: false,
            options: [],
        });
    }

    public async run(client: heemusic, ctx: Context): Promise<any> {
        const guilds = client.guilds.cache.map((guild) => `- **${guild.name}** - (${guild.id})`);
        const chunks = client.utils.chunk(guilds, 10) || [[]];
        const pages = chunks.map((chunk, index) => {
            return this.client
                .embed()
                .setColor(this.client.color.main)
                .setDescription(chunk.join("\n"))
                .setFooter({ text: `Page ${index + 1} of ${chunks.length}` });
        });
        await client.utils.paginate(ctx, pages);
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