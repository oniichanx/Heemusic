import type { ApplicationCommandOption, PermissionResolvable } from "discord.js";
import type heemusic from "./Heemusic.js";

interface CommandDescription {
    content: string;
    usage: string;
    examples: string[];
}

interface CommandPlayer {
    voice: boolean;
    dj: boolean;
    active: boolean;
    djPerm: string | null;
}

interface CommandPermissions {
    dev: boolean;
    client: string[] | PermissionResolvable;
    user: string[] | PermissionResolvable;
}

interface CommandOptions {
    name: string;
    nameLocalizations?: Record<string, string>;
    description?: Partial<CommandDescription>;
    descriptionLocalizations?: Record<string, string>;
    aliases?: string[];
    cooldown?: number;
    args?: boolean;
    player?: Partial<CommandPlayer>;
    permissions?: Partial<CommandPermissions>;
    slashCommand?: boolean;
    options?: ApplicationCommandOption[];
    category?: string;
}

export default class Command {
    public client: heemusic;
    public name: string;
    public nameLocalizations?: Record<string, string>;
    public description: CommandDescription;
    public descriptionLocalizations?: Record<string, string>;
    public aliases: string[];
    public cooldown: number;
    public args: boolean;
    public player: CommandPlayer;
    public permissions: CommandPermissions;
    public slashCommand: boolean;
    public options: ApplicationCommandOption[];
    public category: string;

    constructor(client: heemusic, options: CommandOptions) {
        this.client = client;
        this.name = options.name;
        this.nameLocalizations = options.nameLocalizations ?? {};
        this.description = {
            content: options.description?.content ?? "No description provided",
            usage: options.description?.usage ?? "No usage provided",
            examples: options.description?.examples ?? ["No examples provided"],
        };
        this.descriptionLocalizations = options.descriptionLocalizations ?? {};
        this.aliases = options.aliases ?? [];
        this.cooldown = options.cooldown ?? 3;
        this.args = options.args ?? false;
        this.player = {
            voice: options.player?.voice ?? false,
            dj: options.player?.dj ?? false,
            active: options.player?.active ?? false,
            djPerm: options.player?.djPerm ?? null,
        };
        this.permissions = {
            dev: options.permissions?.dev ?? false,
            client: options.permissions?.client ?? ["SendMessages", "ViewChannel", "EmbedLinks"],
            user: options.permissions?.user ?? [],
        };
        this.slashCommand = options.slashCommand ?? false;
        this.options = options.options ?? [];
        this.category = options.category ?? "general";
    }

    public async run(_client: heemusic, _message: any, _args: string[]): Promise<any> {
        return await Promise.resolve();
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