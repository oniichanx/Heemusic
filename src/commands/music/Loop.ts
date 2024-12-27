import { Command, type Context, type heemusic } from '../../structures/index';

export default class Loop extends Command {
	constructor(client: heemusic) {
		super(client, {
			name: 'loop',
			description: {
				content: 'cmd.loop.description',
				examples: ['loop', 'loop queue', 'loop song'],
				usage: 'loop',
			},
			category: 'general',
			aliases: ['loop'],
			cooldown: 3,
			args: false,
			vote: false,
			player: {
				voice: true,
				dj: false,
				active: true,
				djPerm: null,
			},
			permissions: {
				dev: false,
				client: ['SendMessages', 'ReadMessageHistory', 'ViewChannel', 'EmbedLinks'],
				user: [],
			},
			slashCommand: true,
			options: [],
		});
	}

	public async run(client: heemusic, ctx: Context): Promise<any> {
		const embed = this.client.embed().setColor(this.client.color.main);
		const player = client.manager.getPlayer(ctx.guild!.id);
		let loopMessage = '';

		switch (player?.repeatMode) {
			case 'off': {
				player.setRepeatMode('track');
				loopMessage = ctx.locale('cmd.loop.looping_song');
				break;
			}
			case 'track': {
				player.setRepeatMode('queue');
				loopMessage = ctx.locale('cmd.loop.looping_queue');
				break;
			}
			case 'queue': {
				player.setRepeatMode('off');
				loopMessage = ctx.locale('cmd.loop.looping_off');
				break;
			}
		}

		return await ctx.sendMessage({
			embeds: [embed.setDescription(loopMessage)],
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
