import { Injectable } from "@angular/core";
import { BlogFile, BlogFileCollection } from "../../api/blog-file";
import { Observable } from "rxjs";
import { FileUploadError, FileUploadProgress } from "../../http/file-upload";

@Injectable()
export abstract class AbstractFileService {
    abstract getFiles(): Observable<BlogFileCollection>;
    abstract getFile(id: number): Observable<BlogFile>;
    abstract uploadFile(file: File): void;
    abstract selectFile(blogFile: BlogFile);
    abstract getFileUploaded$(): Observable<BlogFile>;
    abstract getFileUploadProgress$(): Observable<FileUploadProgress>;
    abstract getFileUploadError$(): Observable<FileUploadError>;
    abstract getFileSelected$(): Observable<BlogFile>;
    abstract getShowHideFileManager$(): Observable<boolean>;
    abstract showFileManager(): void;
    abstract hideFileManager(): void;
}