import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UploadFilesService } from '../../../services/httpServices/uploadFiles.service';
import { TemporalService } from 'src/app/services/temporal.service';


@Component({
  selector: 'uploadFilesComponent',
  templateUrl: './uploadFiles.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./uploadFiles.component.css']
})


export class UploadFilesComponent implements OnInit{
  private variableTemporalSubject = new BehaviorSubject<any>(null);
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
 
  constructor(
    private uploadFilesService: UploadFilesService,
    private temporalService: TemporalService
  ) { }


  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  
  upload(): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.uploadFilesService.upload(this.currentFile).subscribe(
          (event: any) => {
            if(event.body){
              this.temporalService.actualizarVariableTemporal(event.body);
              this.variableTemporalSubject.next(event.body);
            }
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          (err: any) => {
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
  
            this.currentFile = undefined;
          });
      }
  
      this.selectedFiles = undefined;
    }
  }
  
  ngOnInit() {
  }
}
