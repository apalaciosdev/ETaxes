import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationToastService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message:string, title:string) {

    this.toastr.success(message, title, { progressBar: true, progressAnimation: 'increasing', timeOut: 3000, positionClass: "toast-bottom-right",});
  }
  
  showError(message:string, title:string) {
    this.toastr.error(message, title, { progressBar: true, progressAnimation: 'increasing', timeOut: 3000, positionClass: "toast-bottom-right",});
  }

  showInfo(message:string, title:string) {
    this.toastr.info(message, title);
  }

  showWarning(message:string, title:string) {
    this.toastr.warning(message, title);
  }
}
