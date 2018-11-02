import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ModalDirective } from './../../directives/modal.directive';
import { FileManagerComponent } from '../file/file-manager.component';
import { Type } from '@angular/compiler';
import { AbstractFileService } from './../../services/file/abstract.file.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  on = false;

  @ViewChild(ModalDirective) modalHost: ModalDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private fileService: AbstractFileService) { }

  ngOnInit() {
    this.fileService.getShowHideFileManager$().subscribe(show => {
      this.on = show;
      if (show) {
        this.loadComponent('FileManagerComponent');
      } else {
        this.deleteComponent();
      }
    });
  }

  private loadComponent(component: string): any {
    let factory = this.componentFactoryResolver.resolveComponentFactory(FileManagerComponent);
    let viewComponentRef = this.modalHost.viewContainerRef;
    viewComponentRef.clear();
    let componentRef = viewComponentRef.createComponent(factory);
    componentRef.instance.selectable = true;
    
  }

  closeModal() {
    this.fileService.hideFileManager();
  }

  private deleteComponent() {
    this.on = false;
    this.modalHost.viewContainerRef.clear();
  }
}
