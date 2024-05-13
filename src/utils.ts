export function formatFileName(title: string, date: string): string {
    return `${title.toLowerCase().replace(/\s+/g, "-")}.md`;
}
export function slugGenerator(title: string): string {
    return `${title.toLowerCase().replace(/\s+/g, "-")}`;
}