import { EmbedBuilder, type Guild, type GuildMember, type TextChannel } from "discord.js";

import { Event, type heemusic } from "../../structures/index.js";

export default class GuildCreate extends Event {
    constructor(client: heemusic, file: string) {
        super(client, file, {
            name: "guildCreate",
        });
    }

    public async run(guild: Guild): Promise<any> {
        let owner: GuildMember | undefined;
        try {
            owner = await guild.members.fetch(guild.ownerId);
        } catch (e) {
            console.error(`Error fetching owner for guild ${guild.id}: ${e}`);
        }

        const embed = new EmbedBuilder()
            .setColor(this.client.config.color.green)
            .setAuthor({ name: guild.name, iconURL: guild.iconURL({ extension: "jpeg" }) })
            .setDescription(`**${guild.name}** has been added to my guilds!`)
            .setThumbnail(guild.iconURL({ extension: "jpeg" }))
            .addFields(
                { name: "Owner", value: owner ? owner.user.tag : "Unknown#0000", inline: true },
                { name: "Members", value: guild.memberCount.toString(), inline: true },
                {
                    name: "Created At",
                    value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`,
                    inline: true,
                },
                {
                    name: "Joined At",
                    value: `<t:${Math.floor(guild.joinedTimestamp / 1000)}:F>`,
                    inline: true,
                },
                { name: "ID", value: guild.id, inline: true }
            )
            .setTimestamp();

        const logChannelId = this.client.config.logChannelId;
        if (!logChannelId) {
            console.error("Log channel ID not found in configuration.");
            return;
        }

        const channel = (await this.client.channels.fetch(logChannelId)) as TextChannel;
        if (!channel) {
            console.error(`Log channel not found with ID ${logChannelId}.`);
            return;
        }

        try {
            await channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(`Error sending message to log channel ${logChannelId}: ${error}`);
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