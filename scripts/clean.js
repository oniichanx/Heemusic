const fs = require('node:fs');
const { rm } = require('node:fs').promises;
const path = require('node:path');

async function clean() {
	try {
		const distPath = path.resolve('dist');
		if (fs.existsSync(distPath)) {
			await rm(distPath, { recursive: true, force: true });
		}
	} catch (error) {
		console.error('Error while cleaning dist folder:', error);
		process.exit(1);
	}
}

clean();

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
