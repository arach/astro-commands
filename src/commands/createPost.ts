import fs from "fs/promises";
import path from "path";
import { formatFileName } from '../utils';
import { generateMarkdown } from '../blog/blogPostMarkdown';
import config from '../config'; // Adjust the import path as needed
import { BlogPost } from '../types';
import chalk from 'chalk';

export async function createBlogPost(
    title: string,
    description: string,
    author?: string,
    tags?: string[],
    excerpt?: string,
    thumbnail?: string,
    categories?: string[],
    featured?: boolean,
    draft?: boolean
) {
    const pubDatetime = new Date().toISOString();
    const blogPost: BlogPost = {
        title,
        pubDatetime,
        author: author || 'Author',
        description,
        tags: tags || [],
        excerpt: excerpt || '',
        thumbnail: thumbnail || 'defaultThumbnail.jpg',
        categories: categories || [],
        featured: featured || false,
        draft: draft || false
    };

    const markdownContent = generateMarkdown(blogPost);
    console.log(title);
    const fileName = formatFileName(title, pubDatetime);
    const filePath = path.join(config.BLOG_POSTS_PATH, fileName);

    try {
        await fs.writeFile(filePath, markdownContent, 'utf8');
        console.log(chalk.green(`New Post can be found at ${filePath}`));
    } catch (err) {
        console.error('Failed to create blog post:', err);
    }
}

