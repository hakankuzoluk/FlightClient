import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeMenuComponent } from './authorize-menu.component';
import { RouterModule } from '@angular/router';
import {MatTreeModule} from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CdkTreeModule } from '@angular/cdk/tree';



@NgModule({
  declarations: [
    AuthorizeMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component:AuthorizeMenuComponent}
    ]),
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    CdkTreeModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthorizeMenuModule { }
