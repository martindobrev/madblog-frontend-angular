import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { ArticlesComponent } from './articles/articles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GlobalStatsComponent } from './global-stats/global-stats.component';
import { FileManagerComponent } from './file/file-manager.component';
import { FileUploadComponent } from './file/file-upload.component';
import { ModalComponent } from './modal/modal.component';
import { ModalDirective } from './modal/modal.directive';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    UsersComponent,
    ModalComponent,
    ModalDirective,
    ArticlesComponent, 
    DashboardComponent, 
    GlobalStatsComponent, 
    FileManagerComponent, 
    FileUploadComponent
  ],
  exports: [
    FileManagerComponent,
    FileUploadComponent,
    ModalComponent
  ],
  entryComponents: [FileManagerComponent, FileUploadComponent],
})
export class AdminModule { }
