export class FileUploadError {
    file: File;
    status: number;
    message: string;
}

export class FileUploadProgress {
    file: File;
    percentLoaded: number;
}