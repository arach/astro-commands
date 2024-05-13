export interface BlogPost {
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
