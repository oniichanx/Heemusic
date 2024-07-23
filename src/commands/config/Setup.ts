import { ChannelType, OverwriteType, PermissionFlagsBits } from "discord.js";
import { Command, type Context, type heemusic } from "../../structures/index.js";
import { getButtons } from "../../utils/Buttons.js";

export default class Setup extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "setup",
            description: {
                content: "Sets up the bot",
                examples: ["setup create", "setup delete", "setup info"],
                usage: "setup",
            },
            category: "config",
            aliases: ["set"],
            cooldown: 3,
            args: true,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ["SendMessages", "ViewChannel", "EmbedLinks", "ManageChannels"],
                user: ["ManageGuild"],
            },
            slashCommand: true,
            options: [
                {
                    name: "create",
                    description: "สร้างช่องทางขอดูดหี",
                    type: 1,
                },
                {
                    name: "delete",
                    description: "ลบช่องทางขอดูดหี",
                    type: 1,
                },
                {
                    name: "info",
                    description: "เปิดช่องทางขอต่อคิวเข้าเย็ดในห้อง",
                    type: 1,
                },
            ],
        });
    }

    public async run(client: heemusic, ctx: Context, args: string[]): Promise<any> {
        const subCommand = ctx.isInteraction ? ctx.interaction.options.data[0].name : args[0];
        const embed = client.embed().setColor(this.client.color.main);
        switch (subCommand) {
            case "create": {
                const data = await client.db.getSetup(ctx.guild.id);
                if (data?.textId && data.messageId) {
                    return await ctx.sendMessage({
                        embeds: [
                            {
                                description: "มีช่องขอดูดหีอยู่แล้ว.",
                                color: client.color.red,
                            },
                        ],
                    });
                }
                const textChannel = await ctx.guild.channels.create({
                    name: `${this.client.user.username}-Hee-List`,
                    type: ChannelType.GuildText,
                    topic: "ช่องทางขอต่อคิวเข้าเย็ดในห้อง.",
                    permissionOverwrites: [
                        {
                            type: OverwriteType.Member,
                            id: this.client.user.id,
                            allow: [
                                PermissionFlagsBits.ViewChannel,
                                PermissionFlagsBits.SendMessages,
                                PermissionFlagsBits.EmbedLinks,
                                PermissionFlagsBits.ReadMessageHistory,
                            ],
                        },
                        {
                            type: OverwriteType.Role,
                            id: ctx.guild.roles.everyone.id,
                            allow: [
                                PermissionFlagsBits.ViewChannel,
                                PermissionFlagsBits.SendMessages,
                                PermissionFlagsBits.ReadMessageHistory,
                            ],
                        },
                    ],
                });
                const player = this.client.queue.get(ctx.guild.id);
                const image = this.client.config.links.img;
                const desc =
                    player?.queue && player.current
                        ? `[${player.current.info.title}](${player.current.info.uri})`
                        : "ไม่มีหีในสต็อกให้เย็ดอยู่. >>> [Invite](https://youtu.be/QAna8T9wvxw) | [Support](https://youtu.be/kEEECmshTjA) | [Website](https://twitter.com/parksunhaaa/status/1555420631315128320?s=12&t=PCnuQMcjF0NR1LB5_rX0iQ)";
                embed.setDescription(desc).setImage(image);
                await textChannel.send({ embeds: [embed], components: getButtons(player) }).then((msg) => {
                    client.db.setSetup(ctx.guild.id, textChannel.id, msg.id);
                });
                await ctx.sendMessage({
                    embeds: [
                        {
                            description: `ช่องทางขอต่อคิวเข้าเย็ดในห้อง ได้ถูกสร้างเข้ามาอยู่แล้ว <#${textChannel.id}>.`,
                            color: this.client.color.main,
                        },
                    ],
                });
                break;
            }
            case "delete": {
                const data2 = await client.db.getSetup(ctx.guild.id);
                if (!data2) {
                    return await ctx.sendMessage({
                        embeds: [
                            {
                                description: "ไม่มีช่องทางขอต่อคิวเย็ดแล้วจร้าไปเปิดห้องใหม่นะจ๊ะ.",
                                color: client.color.red,
                            },
                        ],
                    });
                }
                client.db.deleteSetup(ctx.guild.id);
                const textChannel = ctx.guild.channels.cache.get(data2.textId);
                if (textChannel) await textChannel.delete().catch(() => {});
                await ctx.sendMessage({
                    embeds: [
                        {
                            description: 
                                "ช่องทางขอต่อคิวเข้าเย็ดในห้อง ได้ถูกลบล้างแล้ว. ถ้าห้องยังไม่ได้ถูกลบในรูปแบบคำสั่ง, ให้ทำการลบแบบอัตโนมือเองนะ.",
                            color: this.client.color.main,
                        },
                    ],
                });
                break;
            }
            case "info": {
                const data3 = await client.db.getSetup(ctx.guild.id);
                if (!data3) {
                    return await ctx.sendMessage({
                        embeds: [
                            {
                                description: "ไม่มีช่องทางขอต่อคิวเย็ดแล้วจร้าไปเปิดห้องใหม่นะจ๊ะ.",
                                color: client.color.red,
                            },
                        ],
                    });
                }
                const channel = ctx.guild.channels.cache.get(data3.textId);
                if (channel) {
                    embed.setDescription(`ช่องทางขอต่อคิวเข้าเย็ดในห้อง คือ <#${channel.id}>.`);
                    await ctx.sendMessage({ embeds: [embed] });
                } else {
                    await ctx.sendMessage({
                        embeds: [
                            {
                                description: "ช่องทางขอต่อคิวเข้าเย็ดในห้อง ไม่มี.",
                                color: client.color.red,
                            },
                        ],
                    });
                }
                break;
            }
            default:
                break;
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