import { Component, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { RoleService } from '../../../../services/common/models/role.service';
import { List_Role } from '../../../../contracts/role/List_Role';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent {
  constructor(private roleService: RoleService, spinner : NgxSpinnerService, private alertify : AlertifyService) {
    super(spinner);
  }

  displayedColumns: string[] = ['name','delete','update'];
  dataSource : MatTableDataSource<List_Role> = null
  @ViewChild(MatPaginator) paginator: MatPaginator;
  async getRoles() {
    this.showSpinner(SpinnerType.SquareJellyBox)
    const allRoles : {datas : List_Role[], totalCountRole : number} = await this.roleService.getRoles(this.paginator ? this.paginator.pageIndex : 0,this.paginator ? this.paginator.pageSize : 5, () =>this.hideSpinner(SpinnerType.SquareJellyBox), errorMessage => this.alertify.message(errorMessage,{
      dismissOther:true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }));
    
    console.log(allRoles)
    this.dataSource = new MatTableDataSource<List_Role>(allRoles.datas);
    this.paginator.length = allRoles.totalCountRole;
  }

  async pageChanged() {
    await this.getRoles();

  }


  async ngOnInit() {
    await this.getRoles();
  }
}
