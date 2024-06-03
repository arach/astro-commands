import chalk from 'chalk';
import yargs, { Arguments } from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createBlogPost, updateBlogPost, deleteBlogPost, listBlogPosts } from '../commands/index';
import dotenv from 'dotenv';

dotenv.config();

export function setupCLI() {
    yargs(hideBin(process.argv))
        .scriptName(chalk.white('bun astro-commands'))
        .command(
            'create',
            chalk.blue('Create a new blog post'),
            (yargs) => {
                return yargs
                    .option('t', {
                        alias: 'title',
                        describe: chalk.blue('Title of the blog post'),
                        type: 'string',
                        demandOption: true,
                        requiresArg: true
                    })
                    .option('d', {
                        alias: 'description',
                        describe: chalk.blue('Content of the blog post'),
                        type: 'string',
                        requiresArg: true
                    });
            },
            async (argv: Arguments<{ title: string; description: string; tags?: string[] }>) => {
                console.log(chalk.blue(`Processing your request... ${argv.title} ${argv.description}`));
                try {
                    await createBlogPost(argv.title, argv.description, argv.tags);
                    console.log(chalk.blue('Blog post created successfully!'));
                } catch (error) {
                    console.error(chalk.red('Failed to create blog post:'), error);
                }
            }
        )
        .example(
            'create --title "My New Post" --description "This is the content of my new post"',
            chalk.blue('Creates a new blog post with the specified title and content.')
        )
        .command(
            'move',
            chalk.green('Move a file to the blog folder'),
            (yargs) => {
                return yargs.positional('p', {
                    alias: 'path',
                    describe: chalk.green('Relative path of the file to move'),
                    type: 'string',
                    demandOption: true
                });
            },
            (argv: Arguments<{ path: string }>) => {
                const fs = require('fs');
                const path = require('path');
                const destinationDir = process.env.BLOG_DESTINATION_DIR || path.join(__dirname, '..', 'blog');

                if (!fs.existsSync(destinationDir)) {
                    fs.mkdirSync(destinationDir, { recursive: true });
                }

                // Compute source and destination paths
                const sourcePath = path.join(__dirname, '../..', argv.path);
                const destinationPath = path.join(destinationDir, path.basename(argv.path));

                console.log(chalk.green(`Moving file from ${sourcePath} to ${destinationPath}`));

                // Move the file
                fs.copyFile(sourcePath, destinationPath, (err) => {
                    if (err) {
                        console.error(chalk.red('Failed to move file:'), err);
                    } else {
                        console.log(chalk.green(`File moved successfully to ${destinationPath}`));
                    }
                });
            }
        )
        .command(
            'update',
            chalk.yellow('Update an existing blog post'),
            (yargs) => {
                yargs.positional('title', {
                    describe: chalk.yellow('New title of the blog post'),
                    type: 'string'
                }).positional('content', {
                    describe: chalk.yellow('New content of the blog post'),
                    type: 'string'
                });
            },
            (argv: Arguments<{ title: string; content: string }>) => {
                updateBlogPost(argv.title, argv.content);
                console.log(chalk.yellow(`Blog post ${argv.id} updated successfully!`));
            }
        )
        .example(
            'update 1 "Updated Title" "Updated content"',
            'Updates the blog post with ID 1 to have a new title and content.'
        )
        .command(
            'delete',
            chalk.red('Delete a blog post'),
            (yargs) => {
                yargs.positional('slug', {
                    describe: chalk.cyan('slug of the blog post to delete'),
                    type: 'string'
                });
            },
            (argv: Arguments<{ slug: string }>) => {
                deleteBlogPost(argv.slug);
                console.log(chalk.cyan(`Blog post ${argv.slug} deleted successfully!`));
            })
        .example(
            'delete test-post',
            'Deletes the blog post with slug `test-post`.'
        )
        .command(
            'list',
            chalk.gray('List all blog posts'),
            {},
            () => {
                listBlogPosts();
                console.log(chalk.gray('All blog posts listed.'));
            }
        )
        .example(
            'list',
            'Lists all existing blog posts.'
        )
        .wrap(null)
        .demandCommand(1, chalk.blue('You need at least one command before moving on'))
        .help('help', 'Display this help message')  // Customizing the help command
        .version('version', 'Show version information', '1.0.0')  // Customizing the version command
        .alias('version', 'v')
        .alias('help', 'h')
        .argv;
}

