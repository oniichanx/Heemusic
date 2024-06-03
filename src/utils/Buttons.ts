import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import type { Dispatcher } from "../structures/index.js";

function getButtons(player: Dispatcher): ActionRowBuilder<ButtonBuilder>[] {
    const buttonData = [
        { customId: "LOOP_BUT", emoji: { id: "1200503382062931998", name: "looper" }, style: ButtonStyle.Secondary },
        { customId: "PREV_BUT", emoji: { id: "1200503448777527506", name: "aa_boom_rewind" }, style: ButtonStyle.Secondary },
        {
            customId: "PAUSE_BUT",
            emoji: player?.paused
                ? { id: "1246480210149507225", name: "ae_boom_play" }
                : { id: "1200503399158915173", name: "ac_boom_pause" },
            style: player?.paused ? ButtonStyle.Success : ButtonStyle.Secondary,
        },
        { customId: "SKIP_BUT", emoji: { id: "1200503431111135415", name: "ae_boom_play_pause" }, style: ButtonStyle.Secondary },
        { customId: "SHUFFLE_BUT", emoji: { id: "1200470070955081929", name: "shuffle" }, style: ButtonStyle.Secondary },
        { customId: "FORWARD_BUT", emoji: { id: "1200503431111135415", name: "ae_boom_play_pause" }, style: ButtonStyle.Secondary },
        { customId: "LOW_VOL_BUT", emoji: { id: "1200503331261513728", name: "ah_boom_vol_2" }, style: ButtonStyle.Secondary },
        { customId: "STOP_BUT", emoji: { id: "1200503415101468763", name: "ad_boom_stop" }, style: ButtonStyle.Secondary },
        { customId: "HIGH_VOL_BUT", emoji: { id: "1200503361473089626", name: "ai_boom_vol_3" }, style: ButtonStyle.Secondary },
        { customId: "REWIND_BUT", emoji: { id: "1200503448777527506", name: "aa_boom_rewind" }, style: ButtonStyle.Secondary },
    ];

    const rows = [];

    for (let i = 0; i < 2; i++) {
        const rowButtons = [];
        for (let j = 0; j < 5; j++) {
            const index = i * 5 + j;
            if (index >= buttonData.length) break;
            const { customId, emoji, style } = buttonData[index];
            const button = new ButtonBuilder().setCustomId(customId).setEmoji(emoji).setStyle(style).setDisabled(false);
            rowButtons.push(button);
        }
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(...rowButtons);
        rows.push(row);
    }

    return rows;
}

export { getButtons };

/**
 * Project: heemusic
 * Author: oniichanx
 * Company: ArchGG
 * Copyright (c) 2024. All rights reserved.
 * This code is the property of ArchGG and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/heelee
 */
