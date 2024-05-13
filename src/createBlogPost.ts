// import fs from "fs/promises";
// import path from "path";


// interface BlogPost {
//     title: string;
//     pubDatetime: string;
//     author: string;
//     description: string;
//     tags: string[];
//     excerpt: string;
//     thumbnail: string;
//     categories: string[];
//     featured: boolean;
//     draft: boolean;
// }

// const BLOG_POSTS_DIRECTORY: string = path.join(__dirname, "../../pages/blog");

// function generateMarkdown({
//     title,
//     pubDatetime,
//     author,
//     description,
//     tags,
//     excerpt,
//     thumbnail,
//     categories,
//     featured,
//     draft
// }: BlogPost): string {
//     return `---
// title: "${title}"
// pubDatetime: "${pubDatetime}"
// author: "${author}"
// layout: ../../layouts/BlogPost.astro
// tags: [${tags.join(", ")}]
// excerpt: "${excerpt}"
// thumbnail: "${thumbnail}"
// categories: [${categories.join(", ")}]
// featured: ${featured}
// draft: ${draft}
// ---

// # ${title}

// ${description}

// Enter your blog post content here...
// `;
// }

// function formatFileName(title: string, date: string): string {
//     return `${date}-${title.toLowerCase().replace(/\s+/g, "-")}.md`;
// }

// export async function createBlogPost(
//     title: string,
//     author: string,
//     tags: string[],
//     description: string,
//     excerpt: string,
//     thumbnail: string,
//     categories: string[],
//     featured: boolean,
//     draft: boolean
// ): Promise<void> {
//     try {
//         const date: string = new Date().toISOString().split("T")[0];
//         const fileName: string = formatFileName(title, date);
//         const filePath: string = path.join(BLOG_POSTS_DIRECTORY, fileName);
//         const content: string = generateMarkdown({
//             title,
//             author,
//             tags,
//             pubDatetime: date,
//             description,
//             excerpt,
//             thumbnail,
//             categories,
//             featured,
//             draft
//         });

//         await fs.writeFile(filePath, content);
//         console.log(`Blog post created successfully: ${filePath}`);
//     } catch (err) {
//         console.error("Error writing the blog post:", err);
//     }
// }

