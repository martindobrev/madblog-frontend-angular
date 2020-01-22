import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighLightPipe } from './shared/highlight.pipe';

@NgModule({
    declarations: [HighLightPipe],
    imports: [CommonModule],
    exports: [HighLightPipe]
})

export class MainPipe {}
