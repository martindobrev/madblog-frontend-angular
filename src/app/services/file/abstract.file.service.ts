import { Injectable } from "@angular/core";
import { BlogFile, BlogFileCollection } from "../../api/blog-file";
import { Observable } from "rxjs";
import { FileUploadError } from "./../../http/file-upload-error";

@Injectable()
export abstract class AbstractFileService {
    abstract getFiles(): Observable<BlogFileCollection>;
    abstract getFile(id: number): Observable<BlogFile>;
    abstract uploadFile(file: File): void;
    abstract getFileUploaded$(): Observable<BlogFile>;
    abstract getFileUploadProgress$(): Observable<number>;
    abstract getFileUploadError$(): Observable<FileUploadError>;
}