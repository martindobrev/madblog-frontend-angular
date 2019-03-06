export class Snippet {
    id: number;
    name: string;
    content: string;
}

export class SnippetCollection {
    htmlSnippets: Array<Snippet>;
}