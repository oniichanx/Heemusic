const { exec } = require('node:child_process');

async function startheemusic() {
	exec('npm start', (error, stdout, stderr) => {
		if (error) {
			console.error(`Error starting heemusic: ${error}`);
			return;
		}
		if (stderr) {
			console.error(`Error starting heemusic: ${stderr}`);
		}
	});
}

setTimeout(startheemusic, 5000);

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
