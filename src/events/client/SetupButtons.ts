import type { Message } from "discord.js";
import { Event, type heemusic } from "../../structures/index.js";
import { getButtons } from "../../utils/Buttons.js";
import { buttonReply } from "../../utils/SetupSystem.js";
import { checkDj } from "../player/TrackStart.js";

export default class SetupButtons extends Event {
    constructor(client: heemusic, file: string) {
        super(client, file, {
            name: "setupButtons",
        });
    }
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
    public async run(interaction: any): Promise<void> {
        if (!interaction.replied) await interaction.deferReply().catch(() => {});

        if (!interaction.member.voice.channel)
            return await buttonReply(interaction,`กราบเรียนคุณมึงเชิญเข้าห้องมาก่อนจะใช้ปุ่มน่ะอีสัส.`,this.client.color.red);
        if (
            interaction.guild.members.cache.get(this.client.user.id).voice.channel &&
            interaction.guild.members.cache.get(this.client.user.id).voice.channelId !== interaction.member.voice.channelId
        )
            return await buttonReply(
                interaction,
                `You are not connected to ${interaction.guild.me.voice.channel} to use this buttons.`,
                this.client.color.red,
            );
        const player = this.client.queue.get(interaction.guildId);
        if (!player) return await buttonReply(interaction, "คือมันไม่มีเพลงค้าาอีสัสนรกนี่จะสั่งกูทำไมนักหนา?.", this.client.color.red);
        if (!player.queue) return await buttonReply(interaction, "คือมันไม่มีเพลงค้าาอีสัสนรกนี่จะสั่งกูทำไมนักหนา?.", this.client.color.red);
        if (!player.current) return await buttonReply(interaction, "คือมันไม่มีเพลงค้าาอีสัสนรกนี่จะสั่งกูทำไมนักหนา?.", this.client.color.red);
        const data = await this.client.db.getSetup(interaction.guildId);
        const { title, uri, length } = player.current.info;
        let message: Message;
        try {
            message = await interaction.channel.messages.fetch(data.messageId, { cache: true });
        } catch (_e) {
            /* empty */
        }
        const icon = player ? player.current.info.artworkUrl : this.client.user.displayAvatarURL({ extension: "png" });
        let iconUrl = this.client.config.icons[player.current.info.sourceName];
        if (!iconUrl) iconUrl = this.client.user.displayAvatarURL({ extension: "png" });

        const embed = this.client
            .embed()
            .setAuthor({ name: `เขากำลังดูดไข่ผมม..`, iconURL: iconUrl })
            .setColor(this.client.color.main)
            .setDescription(
                `[${title}](${uri}) - ${player.current.info.isStream ? "LIVE" : this.client.utils.formatTime(length)} - ชายผู้สั่งให้ผมเริ่มดูดไข่ โดยนาย ${
                    player.current.info.requester
                }`,
            )
            .setImage(icon);
        if (!interaction.isButton()) return;
        if (!(await checkDj(this.client, interaction))) {
            await buttonReply(interaction, "You need to have the DJ role to use this command.", this.client.color.red);
            return;
        }
        if (message) {
            switch (interaction.customId) {
                case "LOW_VOL_BUT": {
                    const vol = player.player.volume - 10;
                    player.player.setGlobalVolume(vol);
                    await buttonReply(interaction,`ลดแรงดันควยเป็น ${vol}%`,this.client.color.main);
                    await message.edit({
                        embeds: [
                            embed.setFooter({
                                text: `Volume: ${vol}%`,
                                iconURL: interaction.member.displayAvatarURL({}),
                            }),
                        ],
                    });
                    break;
                }
                case "HIGH_VOL_BUT": {
                    const vol2 = player.player.volume + 10;
                    player.player.setGlobalVolume(vol2);
                    await buttonReply(interaction, `เพิ่มแรงดันควยเป็น ${vol2}%`, this.client.color.main);
                    await message.edit({
                        embeds: [
                            embed.setFooter({
                                text: `Volume: ${vol2}%`,
                                iconURL: interaction.member.displayAvatarURL({}),
                            }),
                        ],
                    });
                    break;
                }
                case "PAUSE_BUT": {
                    const name = player.player.paused ? "เด้าซ้ำ" : "หยุดเด้า";
                    player.pause();
                    await buttonReply(interaction, `${name} ผู้หญิงใน list.`, this.client.color.main);
                    await message.edit({
                        embeds: [
                            embed.setFooter({
                                text: `${name} by ${interaction.member.displayName}`,
                                iconURL: interaction.member.displayAvatarURL({}),
                            }),
                        ],
                        components: getButtons(player),
                    });
                    break;
                }
                case "SKIP_BUT":
                    if (player.queue.length === 0)
                        return await buttonReply(interaction,`ไม่มีหีในคิวให้ข้ามไปเย็ด.`,this.client.color.main);
                    player.skip();
                    await buttonReply(interaction, "ข้ามหาแม่มึงแงะ.", this.client.color.main);
                    await message.edit({
                        embeds: [
                            embed.setFooter({
                                text: `Skipped by ${interaction.member.displayName}`,
                                iconURL: interaction.member.displayAvatarURL({}),
                            }),
                        ],
                    });
                    break;
                case "STOP_BUT":
                    player.stop();
                    await buttonReply(interaction, "หยุดเด้าหาเหิ้ยไรกำลังมันส์.", this.client.color.main);
                    await message.edit({
                        embeds: [
                            embed
                                .setFooter({
                                    text: `Stopped by ${interaction.member.displayName}`,
                                    iconURL: interaction.member.displayAvatarURL({}),
                                })
                                .setDescription("ไม่มีหีในสต็อกให้เย็ดอยู่. >>> [Invite](https://youtu.be/QAna8T9wvxw) | [Support](https://youtu.be/kEEECmshTjA) | [Website](https://twitter.com/parksunhaaa/status/1555420631315128320?s=12&t=PCnuQMcjF0NR1LB5_rX0iQ)")
                                .setImage(this.client.config.links.img)
                                .setAuthor({
                                    name: this.client.user.username,
                                    iconURL: this.client.user.displayAvatarURL({
                                        extension: "png",
                                    }),
                                }),
                        ],
                    });
                    break;
                case "LOOP_BUT": {
                    const loopOptions: Array<"off" | "queue" | "repeat"> = ["off", "queue", "repeat"];
                    const newLoop = loopOptions[Math.floor(Math.random() * loopOptions.length)];

                    if (player.loop === newLoop) {
                        await buttonReply(interaction, `Loop is already ${player.loop}.`, this.client.color.main);
                    } else {
                        player.setLoop(newLoop);
                        await buttonReply(interaction, `Loop set to ${player.loop}.`, this.client.color.main);
                        await message.edit({
                            embeds: [
                                embed.setFooter({
                                    text: `Loop set to ${player.loop} by ${interaction.member.displayName}`,
                                    iconURL: interaction.member.displayAvatarURL({}),
                                }),
                            ],
                        });
                    }
                    break;
                }
                case "SHUFFLE_BUT":
                    player.setShuffle();
                    await buttonReply(interaction, "Shuffled the queue.", this.client.color.main);
                    break;
                case "PREV_BUT":
                    if (!player.previous) return await buttonReply(interaction, "ไม่ได้เย็ดผู้หญิงก่อนหน้านี้.", this.client.color.main);
                    player.previousTrack();
                    await buttonReply(interaction,"กำลังกลับไปซ้ำหีเดิมก่อนหน้า.",this.client.color.main);
                    await message.edit({
                        embeds: [
                            embed.setFooter({
                                text: `กำลังกลับไปซ้ำหีเดิมก่อนหน้า โดยนาย ${interaction.member.displayName}`,
                                iconURL: interaction.member.displayAvatarURL({}),
                            }),
                        ],
                    });
                    break;
                case "REWIND_BUT": {
                    const time = player.player.position - 10000;
                    if (time < 0)
                        return await buttonReply(
                            interaction,
                            "ถอกควยจนสุดล่ะไอเหิ้ยจะเอาสุดไปถึงไหน.",
                            this.client.color.main,
                        );
                    player.seek(time);
                    await buttonReply(interaction, "กำลังถอกหัวควยลง.", this.client.color.main);
                    await message.edit({
                        embeds: [
                            embed.setFooter({
                                text: `Rewinded by ${interaction.member.displayName}`,
                                iconURL: interaction.member.displayAvatarURL({}),
                            }),
                        ],
                    });
                    break;
                }
                case "FORWARD_BUT": {
                    const time2 = player.player.position + 10000;
                    if (time2 > player.current.info.length)
                        return await buttonReply(
                            interaction,
                            "เนื้อควยปิดอยู่แล้วไอสัสจะเอาปิดไปถึงไหน.",
                            this.client.color.main,
                        );
                    player.seek(time2);
                    await buttonReply(interaction, "กำลังดึงหนังควยขึ้นเล็กน้อย.", this.client.color.main);
                    await message.edit({
                        embeds: [
                            embed.setFooter({
                                text: `Forwarded by ${interaction.member.displayName}`,
                                iconURL: interaction.member.displayAvatarURL({}),
                            }),
                        ],
                    });
                    break;
                }
                default:
                    await buttonReply(interaction, "This button is not available.", this.client.color.main);
                    break;
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