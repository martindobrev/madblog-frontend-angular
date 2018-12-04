import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicSiteRoutingModule } from './public-site-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    PublicSiteRoutingModule
  ],
  declarations: [HomeComponent]
})
export class PublicSiteModule { }
