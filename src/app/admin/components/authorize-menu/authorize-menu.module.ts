import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeMenuComponent } from './authorize-menu.component';
import { RouterModule } from '@angular/router';
import {MatTreeModule} from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthorizeMenuDialogComponent } from '../../../dialogs/authorize-menu-dialog/authorize-menu-dialog.component';
import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [
    AuthorizeMenuComponent,
    AuthorizeMenuDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component:AuthorizeMenuComponent}
    ]),
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    CdkTreeModule,
    MatDialogModule,
    MatListModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthorizeMenuModule { }
