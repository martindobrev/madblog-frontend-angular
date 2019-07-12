import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebsiteProperties } from './../../api/website_properties';
import { FormControl, Validators } from '@angular/forms';
import { AbstractFileService } from './../../services/file/abstract.file.service';
import { SettingsService } from './../../services/settings/settings.service';
import { Observable, Subscription } from 'rxjs';
import { AbstractSubscriptionDestroyer } from './../../shared/abstract.subscription.destroyer';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends AbstractSubscriptionDestroyer implements OnInit {

  readonly WEBSITE_LOGO_ID = 'WEBSITE_LOGO';

  websiteProperties: WebsiteProperties;

  titleFormControl: FormControl;
  nameFormControl: FormControl;
  logoFormControl: FormControl;
  versionFormControl: FormControl;

  logoUrl$: Observable<string>;

  isLoading = false;

  constructor(private activatedRoute: ActivatedRoute, private fileService: AbstractFileService, private settingsService: SettingsService) {
    super();
  }

  ngOnInit() {
    this.markForUnsubscription(this.activatedRoute.data.subscribe(data => {
      this.websiteProperties = data.websiteProperties;
    }));

    this.titleFormControl = new FormControl(this.websiteProperties.title, Validators.required);
    this.nameFormControl = new FormControl(this.websiteProperties.name, Validators.required);

    this.markForUnsubscription(this.fileService.getFileSelected$().subscribe(data => {
      if (data.id === this.WEBSITE_LOGO_ID) {
        this.websiteProperties.logoUrl = data.file.id.toString();
        this.fileService.hideFileManager(this.WEBSITE_LOGO_ID);
      }
    }));

    this.markForUnsubscription(this.titleFormControl.valueChanges.subscribe((newTitle: string) => {
      this.websiteProperties.title = newTitle;
    }));

    this.markForUnsubscription(this.nameFormControl.valueChanges.subscribe((newName: string) => {
      this.websiteProperties.name = newName;
    }));
  }

  selectFile() {
    this.fileService.showFileManager(this.WEBSITE_LOGO_ID);
  }

  saveSettings() {
    this.isLoading = true;
    this.settingsService.saveProperties(this.websiteProperties).subscribe(result => {
      this.isLoading = false;
    });
  }

  deleteCurrentLogo() {
    this.websiteProperties.logoUrl = null;
  }
}
