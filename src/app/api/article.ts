export class Article {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    published: boolean;
    editable: boolean = true;
    created: Date;
}

export class ArticleCollection {
    published: Array<Article>;
    unpublished: Array<Article>;
    featured: Array<Article>;
    own: Array<Article>;
}