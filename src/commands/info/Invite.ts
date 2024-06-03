import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class Invite extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "invite",
            description: {
                content: "Sends the bot's invite link",
                examples: ["invite"],
                usage: "invite",
            },
            category: "info",
            aliases: ["inv"],
            cooldown: 3,
            args: false,
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
            options: [],
        });
    }

    public async run(client: heemusic, ctx: Context): Promise<any> {
        const embed = this.client.embed();
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setLabel("Invite")
                .setStyle(ButtonStyle.Link)
                .setURL(
                    `https://discord.com/api/oauth2/authorize?client_id=${client.config.clientId}&permissions=8&scope=bot%20applications.commands`,
                ),
            new ButtonBuilder().setLabel("My Server").setStyle(ButtonStyle.Link).setURL("https://discord.gg/heelee"),
        );

        return await ctx.sendMessage({
            embeds: [
                embed
                    .setColor(this.client.color.main)
                    .setDescription("นายสามารถชวนฉันไปห้องเธอได้โดยคลิกที่ปุ่มด้านล่าง! ถ้าท้องขึ้นมาไม่ใช่ลูกกูน่ะแม่เย็ด!"),
            ],
            components: [row],
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