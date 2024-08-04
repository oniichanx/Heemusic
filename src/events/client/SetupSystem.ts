import { type Message, PermissionsBitField, TextChannel } from "discord.js";
import { T } from "../../structures/I18n.js";
import { Event, type heemusic } from "../../structures/index.js";
import { oops, setupStart } from "../../utils/SetupSystem.js";

export default class SetupSystem extends Event {
    constructor(client: heemusic, file: string) {
        super(client, file, {
            name: "setupSystem",
        });
    }

    public async run(message: Message): Promise<void> {
        const locale = await this.client.db.getLanguage(message.guildId);
        const channel = message.channel as TextChannel;
        if (!(channel instanceof TextChannel)) return;
        if (!message.member?.voice.channel) {
            await oops(channel, T(locale, "event.message.no_voice_channel_queue"));
            await message.delete().catch(() => {});
            return;
        }

        const voiceChannel = message.member.voice.channel;
        const clientUser = this.client.user;
        const clientMember = message.guild.members.cache.get(clientUser.id);

        if (!voiceChannel.permissionsFor(clientUser).has(PermissionsBitField.Flags.Connect | PermissionsBitField.Flags.Speak)) {
            await oops(channel, T(locale, "event.message.no_permission_connect_speak", { channel: voiceChannel.id }));
            await message.delete().catch(() => {});
            return;
        }

        if (clientMember?.voice.channel && clientMember.voice.channelId !== voiceChannel.id) {
            await oops(channel, T(locale, "event.message.different_voice_channel_queue", { channel: clientMember.voice.channelId }));
            await message.delete().catch(() => {});
            return;
        }

        let player = this.client.queue.get(message.guildId);
        if (!player) {
            player = await this.client.queue.create(
                message.guild,
                voiceChannel,
                message.channel,
                this.client.shoukaku.options.nodeResolver(this.client.shoukaku.nodes),
            );
        }

        await setupStart(this.client, message.content, player, message);
        await message.delete().catch(() => {});
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
