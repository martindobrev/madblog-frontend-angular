export class BlogFile {
    id: number;
    name: string;
    contentType: string;
    size: number;
}

export class BlogFileCollection {
    blogFiles: Array<BlogFile>;
}