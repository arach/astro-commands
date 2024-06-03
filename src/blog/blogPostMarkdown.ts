interface BlogPost {
    title: string;
    pubDatetime: string;
    author: string;
    description: string;
    tags: string[];
    excerpt: string;
    thumbnail: string;
    categories: string[];
    featured: boolean;
    draft: boolean;
}

export function generateMarkdown(blogPost: BlogPost): string {
    const { title, author, pubDatetime, description, tags, excerpt, thumbnail, categories } = blogPost;
    let markdown = `---
title: "${title}"
puDatetime: ${pubDatetime}
author: "${author}"
description: "${description}"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
excerpt: "${excerpt}"
thumbnail: "${thumbnail}"
categories: [${categories.map(category => `"${category}"`).join(', ')}]
featured: ${blogPost.featured}
draft: ${blogPost.draft}
---

${description}

`;

    // Additional Markdown content can be appended here
    return markdown;
}