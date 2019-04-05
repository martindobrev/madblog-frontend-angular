import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ModalDirective } from './modal.directive';
import { FileManagerComponent } from '../../admin/file/file-manager.component';
import { Type } from '@angular/compiler';
import { AbstractFileService } from './../../services/file/abstract.file.service';
import { SnippetService } from './../../shared/snippet/snippet.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  id: string;
  on = false;

  @ViewChild(ModalDirective) modalHost: ModalDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver
    , private fileService: AbstractFileService
    , private snippetService: SnippetService) { }

  ngOnInit() {
    this.fileService.getShowHideFileManager$().subscribe((data: {id: string, status: boolean}) => {
      console.log('INFO NEW STATUS ARRIVED - ', data);
      this.id = data.id;
      this.on = data.status;
      if (data.status) {
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
    componentRef.instance.id = this.id;
    componentRef.instance.selectable = true;
  }

  closeModal() {
    this.fileService.hideFileManager(this.id);
  }

  private deleteComponent() {
    this.on = false;
    this.modalHost.viewContainerRef.clear();
  }
}
