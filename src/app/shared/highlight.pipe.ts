import {PipeTransform, Pipe} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({name: 'highlight'})
export class HighLightPipe implements PipeTransform {

    constructor(private _sanitizer: DomSanitizer) {
    }

    // transform(text: string, search: string): string {
    //     console.log('inside pipe: ' + search + text);
    //     return search ? text.replace(new RegExp(search, 'i'),
    //     '<strong style="background-color: red">' + `${search}` + '</strong>') : text;
    // }

    transform(text: string, search: string): SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml( search ? text.replace(new RegExp(search, 'i'),
        '<strong style="background-color: yellow">' + `${search}` + '</strong>') : text);
    }
}
