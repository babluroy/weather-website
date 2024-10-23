import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private toastr: ToastrService
  ) {}


/**
 * @name showToaster
 * @description
 * shows toaster message
 * @param {Title, message, isSuccess} query - searched term
 */
  showToaster(title:any, message:any, isSuccess:boolean){
    if(isSuccess){
        this.toastr.success(title, message);
    } else {
        this.toastr.error(title, message);
    }
  }

}