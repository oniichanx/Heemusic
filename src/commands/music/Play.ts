import { LoadType } from "shoukaku";
import { Command, heemusic, type Context, type heemusic } from "../../structures/index.js";

export default class Play extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "play",
            description: {
                content: "Plays a song from YouTube, Spotify or http",
                examples: [
                    "play example",
                    "play https://www.youtube.com/watch?v=example",
                    "play https://open.spotify.com/track/example",
                    "play http://www.example.com/example.mp3",
                ],
                usage: "play <song>",
            },
            category: "music",
            aliases: ["p"],
            cooldown: 3,
            args: true,
            player: {
                voice: true,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ["SendMessages", "ViewChannel", "EmbedLinks", "Connect", "Speak"],
                user: [],
            },
            slashCommand: true,
            options: [
                {
                    name: "song",
                    description: "The song you want to play",
                    type: 3,
                    required: true,
                    autocomplete: true,
                },
            ],
        });
    }

    public async run(client: heemusic, ctx: Context, args: string[]): Promise<any> {
        const query = args.join(" ");
        await ctx.sendDeferMessage("Loading...");
        let player = client.queue.get(ctx.guild.id);
        const vc = ctx.member as any;
        if (!player) player = await client.queue.create(ctx.guild, vc.voice.channel, ctx.channel);
        const res = await this.client.queue.search(query);
        const embed = this.client.embed();

        switch (res.loadType) {
            case LoadType.ERROR:
                return await ctx.editMessage({
                    embeds: [embed.setColor(this.client.color.red).setDescription("There was an error while searching.")],
                });

            case LoadType.EMPTY:
                return await ctx.editMessage({
                    embeds: [embed.setColor(this.client.color.red).setDescription("There were no results found.")],
                });

            case LoadType.TRACK: {
                const track = player.buildTrack(res.data, ctx.author);
                if (player.queue.length > client.config.maxQueueSize) {
                    return await ctx.editMessage({
                        embeds: [
                            embed
                                .setColor(this.client.color.red)
                                .setDescription(`The queue is too long. The maximum length is ${client.config.maxQueueSize} songs.`),
                        ],
                    });
                }
                player.queue.push(track);
                await player.isPlaying();
                return await ctx.editMessage({
                    embeds: [
                        embed
                            .setColor(this.client.color.main)
                            .setDescription(`Added [${res.data.info.title}](${res.data.info.uri}) to the queue.`),
                    ],
                });
            }

            case LoadType.PLAYLIST: {
                if (res.data.tracks.length > client.config.maxPlaylistSize) {
                    return await ctx.editMessage({
                        embeds: [
                            embed
                                .setColor(this.client.color.red)
                                .setDescription(`The playlist is too long. The maximum length is ${client.config.maxPlaylistSize} songs.`),
                        ],
                    });
                }
                for (const track of res.data.tracks) {
                    const pl = player.buildTrack(track, ctx.author);
                    if (player.queue.length > client.config.maxQueueSize) {
                        return await ctx.editMessage({
                            embeds: [
                                embed
                                    .setColor(this.client.color.red)
                                    .setDescription(`The queue is too long. The maximum length is ${client.config.maxQueueSize} songs.`),
                            ],
                        });
                    }
                    player.queue.push(pl);
                }
                await player.isPlaying();
                return await ctx.editMessage({
                    embeds: [embed.setColor(this.client.color.main).setDescription(`Added ${res.data.tracks.length} songs to the queue.`)],
                });
            }

            case LoadType.SEARCH: {
                const track1 = player.buildTrack(res.data[0], ctx.author);
                if (player.queue.length > client.config.maxQueueSize) {
                    return await ctx.editMessage({
                        embeds: [
                            embed
                                .setColor(this.client.color.red)
                                .setDescription(`The queue is too long. The maximum length is ${client.config.maxQueueSize} songs.`),
                        ],
                    });
                }
                player.queue.push(track1);
                await player.isPlaying();
                return await ctx.editMessage({
                    embeds: [
                        embed
                            .setColor(this.client.color.main)
                            .setDescription(`Added [${res.data[0].info.title}](${res.data[0].info.uri}) to the queue.`),
                    ],
                });
            }
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