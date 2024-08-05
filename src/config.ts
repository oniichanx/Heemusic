import "dotenv/config";
import { SearchEngine } from "./types.js";

const parseBoolean = (value?: string): boolean => value?.trim().toLowerCase() === "true";

export default {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
    color: {
        red: 0xff0000,
        green: 0x00ff00,
        blue: 0x0000ff,
        yellow: 0xffff00,
        main: 0x2f3136,
    },
    emoji: {
        // You can add custom emoji with ID format (e.g., <:emojiName:123456789012345678>)
        pause: "<:ac_boom_pause:1200503399158915173>",
        resume: "<:aa_boom_play:1246480210149507225>",
        stop: "<:ad_boom_stop:1200503415101468763>",
        skip: "<:ae_boom_play_pause:1200503431111135415>",
        previous: "<:aa_boom_rewind:1200503448777527506>",
        forward: "<:db_forward2:1269641348022276146>",
        replay: "<:backward2:1269641334147514419>",
        voldown: "<:ah_boom_vol_2:1200503331261513728>",
        volup: "<:ai_boom_vol_3:1200503361473089626>",
        shuffle: "<:shuffle:1200470070955081929>",
        loop: {
            none: "<:rightwards:1269634237141745759>",
            track: "<:rightwards_overlay:1269632185472647189>",
        },
        page: {
            last: "⏩",
            fast: "⏪",
            back: "⬅️",
            next: "➡️",
            cancel: "⏹️",
        },
    },
    defaultLanguage: process.env.DEFAULT_LANGUAGE,
    topGG: process.env.TOPGG,
    keepAlive: parseBoolean(process.env.KEEP_ALIVE),
    autoNode: parseBoolean(process.env.AUTO_NODE),
    searchEngine: SearchEngine.YouTube, // YouTube (YouTube Search), YouTubeMusic (YouTube Music Search), Spotify (Spotify Search), SoundCloud (SoundCloud Search), Apple (Apple Search) or Yandex (Yandex Search).
    maxPlaylistSize: parseInt(process.env.MAX_PLAYLIST_SIZE || "100"),
    botStatus: process.env.BOT_STATUS || "online",
    botActivity: process.env.BOT_ACTIVITY || "heemusic",
    botActivityType: parseInt(process.env.BOT_ACTIVITY_TYPE || "2"),
    maxQueueSize: parseInt(process.env.MAX_QUEUE_SIZE || "100"),
    owners: process.env.OWNER_IDS ? JSON.parse(process.env.OWNER_IDS) : [],
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
    logChannelId: process.env.LOG_CHANNEL_ID,
    commandLogs: process.env.LOG_COMMANDS_ID,
    links: {
        img: process.env.IMG_LINK || "https://i.imgur.com/ud3EWNh.jpg",
    },
    icons: {
        youtube: "https://i.imgur.com/xzVHhFY.png",
        spotify: "https://i.imgur.com/qvdqtsc.png",
        soundcloud: "https://i.imgur.com/MVnJ7mj.png",
        applemusic: "https://i.imgur.com/Wi0oyYm.png",
        deezer: "https://i.imgur.com/xyZ43FG.png",
        jiosaavn: "https://i.imgur.com/N9Nt80h.png",
    },
    production: parseBoolean(process.env.PRODUCTION) ?? true,
    lavalink: [
        {
            url: process.env.LAVALINK_URL,
            auth: process.env.LAVALINK_AUTH,
            name: process.env.LAVALINK_NAME,
            secure: parseBoolean(process.env.LAVALINK_SECURE),
        },
    ],
};

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
