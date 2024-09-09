import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import {MatListModule} from '@angular/material/list';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { AuthorizeUserDialogComponent } from './authorize-user-dialog/authorize-user-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
 
  
    AuthorizeUserDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatTreeModule,
    MatListModule,
    MatBadgeModule
  ] // Eğer Angular 9 veya daha eski bir sürüm kullanıyorsanız
})
export class DialogsModule { }
