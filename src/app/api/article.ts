export class Article {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    htmlContent: string;
    imageId: number;
    published: boolean;
    editable: boolean = true;
    created: Date;
    authorId: string;
}

export class ArticleCollection {
    published: Array<Article>;
    unpublished: Array<Article>;
    featured: Array<Article>;
    own: Array<Article>;
}