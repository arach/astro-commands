import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import slugify from 'slugify';

// Define the interface for book data
interface Book {
    Title: string;
    Author: string;
    Description: string;
    ISBN: string;
    ISBN13: string;
    MyRating: number;
    AverageRating: number;
    Publisher: string;
    Binding: string;
    NumberOfPages: number;
    YearPublished: number;
    OriginalPublicationYear: number;
    DateRead: string;
    DateAdded: string;
    Bookshelves: string;
    ExclusiveShelf: string;
    ReadCount: number;
    OwnedCopies: number;
}

// Directory to save markdown files
const outputDir = path.join(__dirname, '../..', 'content', 'drafts', 'books');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Function to generate markdown content
const generateMarkdownContent = (book: Book) => {
    const slugifiedTitle = slugify(book.Title, { lower: true, strict: true });
    const tags = ["Business", "Nonfiction", "Leadership", "Management", "Entrepreneurship", "Self Help"];
    const thumbnail = `assets/images/books/${slugifiedTitle}.jpeg`;

    return `---
title: "${book.Title}"
addedDatetime: ${new Date().toISOString()}
pubDatetime: ${new Date().toISOString()}
authors: ["${book.Author}"]
description: "${book.Description}"
tags: ${JSON.stringify(tags)}
thumbnail: "${thumbnail}"
isbn: "${book.ISBN13}"
categories: []
featured: true
draft: false
---

this book by ${book.Author} 
`;
};

function cleanISBN(input: string): string {
    return input.replace(/[^0-9X]/gi, '');
}

export const importBooks = async (csvFilePath: string) => {
    const books: Book[] = [];

    await new Promise<void>((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row: Book) => {
                books.push(row);
            })
            .on('end', () => {
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            });
    });

    for (const book of books) {
        book.ISBN13 = cleanISBN(book.ISBN13);
        const markdownContent = generateMarkdownContent(book);
        const slugifiedTitle = slugify(book.Title, { lower: true, strict: true });
        const markdownFilePath = path.join(outputDir, `${slugifiedTitle}.md`);
        await fs.writeFileSync(markdownFilePath, markdownContent);
    }

    console.log('Markdown files created successfully.');
};
