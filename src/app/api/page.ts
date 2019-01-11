export class Page {
    id: number;
	name: string;
	slug: string;
	order: number;
	content: string;
	htmlContent: string;
	authorId: string;
	published: boolean;
	created: Date;
}

export class PageCollection {
	pages: Array<Page>;
}