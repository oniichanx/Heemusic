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
        if (!interaction.member.voice.channel) {
            return await buttonReply(interaction,`กราบเรียนคุณมึงเชิญเข้าห้องมาก่อนจะใช้ปุ่มน่ะอีสัส.`,this.client.color.red);
        }
        const clientMember = interaction.guild.members.cache.get(this.client.user.id);
        if (clientMember.voice.channel && clientMember.voice.channelId !== interaction.member.voice.channelId) {
            return await buttonReply(
                interaction,
                `You are not connected to ${clientMember.voice.channel} to use these buttons.`,
                this.client.color.red,
            );
        }
        const player = this.client.queue.get(interaction.guildId);
        if (!player) return await buttonReply(interaction, "คือมันไม่มีเพลงค้าาอีสัสนรกนี่จะสั่งกูทำไมนักหนา?.", this.client.color.red);
        if (!player.queue) return await buttonReply(interaction, "คือมันไม่มีเพลงค้าาอีสัสนรกนี่จะสั่งกูทำไมนักหนา?.", this.client.color.red);
        if (!player.current) return await buttonReply(interaction, "คือมันไม่มีเพลงค้าาอีสัสนรกนี่จะสั่งกูทำไมนักหนา?.", this.client.color.red);
        const data = await this.client.db.getSetup(interaction.guildId);
        const { title, uri, length, artworkUrl, sourceName, isStream, requester } = player.current.info;
        let message: Message;
        try {
            message = await interaction.channel.messages.fetch(data.messageId, { cache: true });
        } catch (_e) {
            /* empty */
        }

        const iconUrl = this.client.config.icons[sourceName] || this.client.user.displayAvatarURL({ extension: "png" });
        const embed = this.client
            .embed()
            .setAuthor({ name: `เขากำลังดูดไข่ผมม..`, iconURL: iconUrl })
            .setColor(this.client.color.main)
            .setDescription(`[${title}](${uri}) - ${isStream ? "LIVE" : this.client.utils.formatTime(length)} - ชายผู้สั่งให้ผมเริ่มดูดไข่ โดยนาย ${requester}`)
            .setImage(artworkUrl || this.client.user.displayAvatarURL({ extension: "png" }));
        if (!interaction.isButton()) return;
        if (!(await checkDj(this.client, interaction))) {
            return await buttonReply(interaction, "You need to have the DJ role to use this command.", this.client.color.red);
        }
        if (message) {
            const handleVolumeChange = async (change: number) => {
                const vol = player.player.volume + change;
                player.player.setGlobalVolume(vol);
                await buttonReply(interaction, `เพิ่มลดแรงดันควยเป็น ${vol}%`, this.client.color.main);
                await message.edit({
                    embeds: [embed.setFooter({ text: `Volume: ${vol}%`, iconURL: interaction.member.displayAvatarURL({}) })],
                });
            };
            switch (interaction.customId) {
                case "LOW_VOL_BUT":
                    await handleVolumeChange(-10);
                    break;
                case "HIGH_VOL_BUT":
                    await handleVolumeChange(10);
                    break;
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
                    if (!player.queue.length) {
                        return await buttonReply(interaction,`ไม่มีหีในคิวให้ข้ามไปเย็ด.`,this.client.color.main);
                    }
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
                                    iconURL: this.client.user.displayAvatarURL({ extension: "png" }),
                                }),
                        ],
                    });
                    break;
                case "LOOP_BUT": {
                    // Define loop options in Thai and English
                    const loopOptionsThai: Array<"ปิด" | "คิว" | "ทำซ้ำ"> = ["ปิด", "คิว", "ทำซ้ำ"];
                    const loopOptionsEnglish: Array<"off" | "queue" | "repeat"> = ["off", "queue", "repeat"];
                    
                    // Find the index of current loop option and determine the next one
                    const currentIndex = loopOptionsEnglish.indexOf(player.loop as "off" | "queue" | "repeat");
                    const newLoop = loopOptionsEnglish[(currentIndex + 1) % loopOptionsEnglish.length];
                    
                    // Set the new loop option
                    player.setLoop(newLoop);
                    
                    // Reply with the loop setting in Thai
                    await buttonReply(interaction, `ตั้งค่าเล่นวนรอบเป็น ${loopOptionsThai[currentIndex]}.`, this.client.color.main);
                    
                    // Update message embed footer with the loop setting in Thai
                    await message.edit({
                        embeds: [
                            embed.setFooter({
                                text: `ตั้งค่าเล่นวนรอบเป็น ${loopOptionsThai[currentIndex]} by ${interaction.member.displayName}`,
                                iconURL: interaction.member.displayAvatarURL({}),
                                }),
                            ],
                        });
                    
                        break;
                    }
                case "SHUFFLE_BUT":
                    player.setShuffle();
                    await buttonReply(interaction, "สุ่มผู้หญิงเย็ดในคิว.", this.client.color.main);
                    break;
                case "PREV_BUT":
                    if (!player.previous) {
                        return await buttonReply(interaction, "ไม่ได้เย็ดผู้หญิงก่อนหน้านี้.", this.client.color.main);
                    }
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
                    if (time < 0) {
                        return await buttonReply(
                            interaction,
                            "ถอกควยจนสุดล่ะไอเหิ้ยจะเอาสุดไปถึงไหน.",
                            this.client.color.main,
                        );
                    }
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
                    const time = player.player.position + 10000;
                    if (time > player.current.info.length) {
                        return await buttonReply(
                            interaction,
                            "เนื้อควยปิดอยู่แล้วไอสัสจะเอาปิดไปถึงไหน.",
                            this.client.color.main,
                        );
                    }
                    player.seek(time);
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