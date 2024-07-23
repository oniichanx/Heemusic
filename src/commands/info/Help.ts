import { Command, type Context, type heemusic } from "../../structures/index.js";

export default class Help extends Command {
    constructor(client: heemusic) {
        super(client, {
            name: "help",
            description: {
                content: "cmd.help.description",
                examples: ["help"],
                usage: "help",
            },
            category: "info",
            aliases: ["h"],
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
            options: [
                {
                    name: "command",
                    description: "ตามด้วยคำสั่งทวงท่าของฉันที่นายอยากจะดูได้เลย",
                    type: 3,
                    required: false,
                },
            ],
        });
    }

    public async run(client: heemusic, ctx: Context, args: string[]): Promise<any> {
        const embed = this.client.embed();
        const guild = await client.db.get(ctx.guild.id);
        const commands = this.client.commands.filter((cmd) => cmd.category !== "dev");
        const categories = [...new Set(commands.map((cmd) => cmd.category))];

        if (args[0]) {
            const command = this.client.commands.get(args[0].toLowerCase());
            if (!command) {
                return await ctx.sendMessage({
                    embeds: [embed.setColor(this.client.color.red).setDescription(ctx.locale("cmd.help.not_found", { cmdName: args[0] }))],
                });
            }
            const helpEmbed = embed
                .setColor(client.color.main)
                .setTitle(`${ctx.locale("cmd.help.title")} - ${command.name}`)
                .setDescription(
                    ctx.locale("cmd.help.help_cmd", {
                        description: ctx.locale(command.description.content),
                        usage: `${guild.prefix}${command.description.usage}`,
                        examples: command.description.examples.map((example) => `${guild.prefix}${example}`).join(", "),
                        aliases: command.aliases.map((alias) => `\`${alias}\``).join(", "),
                        category: command.category,
                        cooldown: command.cooldown,
                        premUser:
                            command.permissions.user.length > 0 ? command.permissions.user.map((perm) => `\`${perm}\``).join(", ") : "None",
                        premBot: command.permissions.client.map((perm) => `\`${perm}\``).join(", "),
                        dev: command.permissions.dev ? "Yes" : "No",
                        slash: command.slashCommand ? "Yes" : "No",
                        args: command.args ? "Yes" : "No",
                        player: command.player.active ? "Yes" : "No",
                        dj: command.player.dj ? "Yes" : "No",
                        djPerm: command.player.djPerm ? command.player.djPerm : "None",
                        voice: command.player.voice ? "Yes" : "No",
                    }),
                );
            return await ctx.sendMessage({ embeds: [helpEmbed] });
        }

        const fields = categories.map((category) => ({
            name: category,
            value: commands
                .filter((cmd) => cmd.category === category)
                .map((cmd) => `\`${cmd.name}\``)
                .join(", "),
            inline: false,
        }));
        
        const helpEmbed = embed
            .setColor(client.color.main)
            .setTitle(ctx.locale("cmd.help.title"))
            .setDescription(ctx.locale("cmd.help.content", { bot: client.user.username, prefix: guild.prefix }))
            .setFooter({ text: ctx.locale("cmd.help.footer", { prefix: guild.prefix }) })
            .addFields(...fields);
            
        return await ctx.sendMessage({ embeds: [helpEmbed] });
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
