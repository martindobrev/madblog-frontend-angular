import { FileService } from './../services/file/file.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractFileService } from './../services/file/abstract.file.service';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GlobalStatsComponent } from './global-stats/global-stats.component';
import { FileManagerComponent } from './file/file-manager.component';
import { FileUploadComponent } from './file/file-upload.component';
import { ModalComponent } from './modal/modal.component';
import { ModalDirective } from './modal/modal.directive';
import { SharedModule } from '../shared/shared.module';
import { MaddobLibModule } from 'maddob-lib';
import { SettingsComponent } from './settings/settings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchBarComponent } from './file/search-bar/search-bar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaddobLibModule
  ],
  declarations: [
    UsersComponent,
    ModalComponent,
    ModalDirective,
    DashboardComponent,
    GlobalStatsComponent,
    FileManagerComponent,
    FileUploadComponent, SettingsComponent, SearchBarComponent
  ],
  exports: [
    FileManagerComponent,
    FileUploadComponent,
    ModalComponent
  ],
  entryComponents: [FileManagerComponent, FileUploadComponent],

  providers: [
    FileService
  ]
})
export class AdminModule { }
