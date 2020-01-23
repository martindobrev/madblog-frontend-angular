import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({name: 'highlight'})
export class HighLightPipe implements PipeTransform {

    constructor(private _sanitizer: DomSanitizer) {
    }

    transform(text: string, search: string): SafeHtml {
        // if (/\W|[_]/g.test(search)){ //if str has any symbols
        //     search = search.replace(/\W|_/g, '[$&]'); //use brekits [ ] for that symbols
        //   }
        return this._sanitizer.bypassSecurityTrustHtml( search ? text.replace(new RegExp(search, 'gi'),
        '<span style="background-color: yellow">' + `${search}` + '</span>') : text);
    }
}
