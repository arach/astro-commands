import chalk from 'chalk';

export function moveBlogPost(filePath: string, destinationDir: string) {
    console.log(`Move post ${filePath} to ${destinationDir}`);
    const fs = require('fs');
    const path = require('path');
    if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
    }

    // Compute source and destination paths
    const sourcePath = path.join(__dirname, '../..', filePath);
    const destinationPath = path.join(destinationDir, path.basename(filePath));

    console.log(chalk.green(`Moving file from ${sourcePath} to ${destinationPath}`));

    // Move the file
    fs.copyFile(sourcePath, destinationPath, (err: Error) => {
        if (err) {
            console.error(chalk.red('Failed to move file:'), err);
        } else {
            console.log(chalk.green(`File moved successfully to ${destinationPath}`));
        }
    });
}

