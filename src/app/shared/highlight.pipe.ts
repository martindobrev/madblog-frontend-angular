import {PipeTransform, Pipe} from '@angular/core';

@Pipe({name: 'highlight'})
export class HighLightPipe implements PipeTransform {
    transform(text: string, search: string): string {
        console.log('inside pipe: ' + search + text);
        return search ? text.replace(new RegExp(search, 'i'),
        '<span style="background-color: red">' + `${search}` + '</span>') : text;
    }
}
