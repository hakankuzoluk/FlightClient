import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../contracts/user';
import { UserService } from '../../../services/common/models/user.service';
import { Create_User } from '../../../contracts/users/create_user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BaseComponent implements OnInit{

  
  constructor(private formBuilder:FormBuilder, private userService : UserService, private toastrService : CustomToastrService, spinner: NgxSpinnerService) {
    super(spinner);
  }
  
  frm:FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.maxLength(100), Validators.email]],
      nameSurname: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      userName : ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      pass: ["", [Validators.required]],
      passAgain :["", [Validators.required]]
    }, {validators: (group : AbstractControl) : ValidationErrors | null =>
      {
        let pass = group.get("pass").value;
        let passAgain = group.get("passAgain").value;
        return pass == passAgain ? null : { notSame : true }
      }  
    })
  }

  get component() {
    return this.frm.controls
  }

  submitted: boolean = false;
  async onSubmit(user : User) {
    this.submitted = true;
    if(this.frm.invalid)
      return
    
    const result : Create_User = await this.userService.create(user);
    if(result.succeeded) 
      this.toastrService.message(result.message,"Kullanıcı Kaydı Başarılı", {
        messageType : ToastrMessageType.Success,
        position : ToastrPosition.TopRight
      })
    else
      this.toastrService.message(result.message,"Hata", {
        messageType : ToastrMessageType.Error,
        position : ToastrPosition.TopRight
      })
    

  }
  

}
