export class BlogFile {
    id: number;
    name: string;
    contentType: string;
    size: number;
}

export class BlogFileCollection {
    files: Array<BlogFile>;
}