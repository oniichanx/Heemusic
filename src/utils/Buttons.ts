import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import type { Dispatcher } from "../structures/index.js";

function getButtons(player: Dispatcher): ActionRowBuilder<ButtonBuilder>[] {
    const buttonData = [
        { customId: "REWIND_BUT", emoji: { id: "1200503448777527506", name: "aa_boom_rewind" }, style: ButtonStyle.Secondary },
        { customId: "LOW_VOL_BUT", emoji: { id: "1200503331261513728", name: "ah_boom_vol_2" }, style: ButtonStyle.Secondary },
        { customId: "STOP_BUT", emoji: { id: "1200503415101468763", name: "ad_boom_stop" }, style: ButtonStyle.Secondary },
        { customId: "HIGH_VOL_BUT", emoji: { id: "1200503361473089626", name: "ai_boom_vol_3" }, style: ButtonStyle.Secondary },
        { customId: "FORWARD_BUT", emoji: { id: "1200503431111135415", name: "ae_boom_play_pause" }, style: ButtonStyle.Secondary },
        { customId: "PREV_BUT", emoji: { id: "1200503448777527506", name: "aa_boom_rewind" }, style: ButtonStyle.Secondary },
        { customId: "LOOP_BUT", emoji: { id: "1200503382062931998", name: "looper" }, style: ButtonStyle.Secondary },
        {
            customId: "PAUSE_BUT",
            emoji: player?.paused
                ? { id: "1246480210149507225", name: "ae_boom_play" }
                : { id: "1200503399158915173", name: "ac_boom_pause" },
            style: player?.paused ? ButtonStyle.Success : ButtonStyle.Secondary,
        },
        { customId: "SKIP_BUT", emoji: { id: "1200503431111135415", name: "ae_boom_play_pause" }, style: ButtonStyle.Secondary },
        { customId: "SHUFFLE_BUT", emoji: { id: "1200470070955081929", name: "shuffle" }, style: ButtonStyle.Secondary },
    ];

    // Using reduce to organize buttons into rows
    const rows = buttonData.reduce((accumulator, { customId, emoji, style }, index) => {
        // Check if index is divisible by 5 to start a new row
        if (index % 5 === 0) {
            accumulator.push(new ActionRowBuilder<ButtonBuilder>());
        }

        // Create a new button builder with the emoji ID
        const button = new ButtonBuilder().setCustomId(customId).setEmoji(emoji).setStyle(style);

        // Add the button to the last action row
        accumulator[accumulator.length - 1].addComponents(button);

        return accumulator;
    }, [] as ActionRowBuilder<ButtonBuilder>[]);

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
