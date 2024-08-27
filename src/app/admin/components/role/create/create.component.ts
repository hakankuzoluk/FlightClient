import { Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from '../../../../services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent {

  constructor(private roleService: RoleService,
                      spinner: NgxSpinnerService,
                      private alertify: AlertifyService)
  {
    super(spinner);
  }

  ngOnInit(): void {
  }

  @Output() createdRole : EventEmitter<string> = new EventEmitter(); 

  create(name: HTMLInputElement) {

    this.showSpinner(SpinnerType.SquareJellyBox);


    this.roleService.create(name.value, () => {
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.alertify.message("Role Başarıyla Eklendi.", {
        dismissOther: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdRole.emit(name.value)
    }, (errorMessage) => {
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.alertify.message(errorMessage, {
        dismissOther: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    });
  }

}
