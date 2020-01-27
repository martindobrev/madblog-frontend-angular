import { AbstractFileService } from '../services/file/abstract.file.service';
import { BlogFile, BlogFileCollection, BlogFilePage } from './../api/blog-file';
import { of, Observable } from 'rxjs';
import { FileUploadProgress, FileUploadError } from '../http/file-upload';
export class MockFileService extends AbstractFileService {

    private fileCollection: BlogFileCollection;

    constructor(collection: BlogFileCollection) {
        super();

        if (!collection) {
            collection = new BlogFileCollection();
        }

        if (!collection.blogFiles) {
            const dummyFile = new BlogFile();
            dummyFile.id = 4;
            dummyFile.name = 'TEST';
            dummyFile.contentType = 'text/plain';
            dummyFile.size = 12312;
            collection.blogFiles = [dummyFile];
        }
        this.fileCollection = collection;
    }

    getFiles(): Observable<BlogFileCollection> {
        // tslint:disable-next-line: comment-format
        //this.fileCollection.blogFiles)
       return of(this.fileCollection);
    }
    getFile(id: number): Observable<BlogFile> {
        throw new Error('Method not implemented.');
    }
    uploadFile(file: File): void {
        throw new Error('Method not implemented.');
    }

    selectFile(id: string, blogFile: BlogFile): void {
        if (undefined === this.fileCollection.blogFiles.find(element => element.id === +id)) {
            throw new Error('No such a file');
        }
        // tslint:disable-next-line: comment-format
        //throw new Error('No such a file');
        // throw new Error('Method not implemented.');
    }

    deleteFile(blogFile: BlogFile): Observable<any> {
        return of(blogFile);
    }

    getFileUploaded$(): Observable<BlogFile> {
        return of();
    }

    getFileUploadProgress$(): Observable<FileUploadProgress> {
        return null;
    }

    getFileUploadError$(): Observable<FileUploadError> {
        return null;
    }

    getFileSelected$(): Observable<{id: string, file: BlogFile}>  {
        return null;
    }

    getShowHideFileManager$(): Observable<{id: string, status: boolean}> {
        return of({id: 'TEST', status: true});
    }

    showFileManager(id: string): void {
        return;
    }

    hideFileManager(id: string): void {
        return;
    }

    getFilePage(pageNumber: number): Observable<BlogFilePage> {
        throw new Error('Method not implemented.');
    }
}
