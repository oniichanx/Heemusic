import { exec } from "node:child_process";

async function startheemusic(): Promise<void> {
    exec("npm start", (error, stderr) => {
        if (error) {
            console.error(`Error starting heemusic: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error output: ${stderr}`);
        }
    });
}

setTimeout(startheemusic, 5000);
