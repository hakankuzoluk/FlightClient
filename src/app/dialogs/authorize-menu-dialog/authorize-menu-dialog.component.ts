import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> {
  constructor(dialogRef: MatDialogRef<AuthorizeMenuDialogComponent >,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService) {
    super(dialogRef)
  };

  
  assignRoles(rolesComponent: MatSelectionList) {
    this.spinner.show(SpinnerType.SquareJellyBox);
  
  }
}

export enum AuthorizeMenuState {
  Yes,
  No
}