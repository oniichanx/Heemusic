import { Event, type heemusic } from '../../structures/index';

export default class ChannelDelete extends Event {
	constructor(client: heemusic, file: string) {
		super(client, file, {
			name: 'channelDelete',
		});
	}

	public async run(channel: any): Promise<void> {
		const { guild } = channel;
		const setup = await this.client.db.getSetup(guild.id);
		const stay = await this.client.db.get_247(guild.id);

		if (Array.isArray(stay)) {
			for (const s of stay) {
				if (channel.type === 2 && s.voiceId === channel.id) {
					await this.client.db.delete_247(guild.id);
					break;
				}
			}
		} else if (stay) {
			if (channel.type === 2 && stay.voiceId === channel.id) {
				await this.client.db.delete_247(guild.id);
			}
		}

		if (setup && channel.type === 0 && setup.textId === channel.id) {
			await this.client.db.deleteSetup(guild.id);
		}

		const player = this.client.manager.getPlayer(guild.id);
		if (player && player.voiceChannelId === channel.id) {
			player.destroy();
		}
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
