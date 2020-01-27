import { User } from './user';

export class Article {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    htmlContent: string;
    imageId: number;
    published: boolean;
    featured: boolean;
    editable = true;
    deletable = false;
    created: Date;
    authorId: string;
    user: User;
}

export class ArticleCollection {
    articles: Array<Article>;
}
