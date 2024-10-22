import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private toastr: ToastrService
  ) {}


  showToaster(title:any, message:any, isSuccess:boolean){
    if(isSuccess){
        this.toastr.success(title, message);
    } else {
        this.toastr.error(title, message);
    }
  }

}