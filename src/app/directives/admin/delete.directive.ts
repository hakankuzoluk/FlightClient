import { Directive, ElementRef, Renderer2, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { HttpClientService } from '../../services/common/http-client.service';
import { FlightsService } from '../../services/common/models/flights.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
              private _renderer: Renderer2,
              private httpClientService: HttpClientService,
              private dialog : MatDialog,
              private spinner : NgxSpinnerService,
              private alertify : AlertifyService) {
    const img = this._renderer.createElement('img');
    this._renderer.setAttribute(img, 'src', '/delete.png'); // Correctly set the src attribute
    this._renderer.setAttribute(img, 'style', 'cursor: pointer;');
    this._renderer.setStyle(img, 'width', '25px');
    this._renderer.setStyle(img, 'height', '25px');
    this._renderer.appendChild(this.element.nativeElement, img);
  }

  
  @Input() id : string;
  @Input() controller : string;
  @Output() callback : EventEmitter<any> = new EventEmitter();
  
  @HostListener('click', ['$event'])
  async onClick(event: Event) {
    this.openDialog( async ()=> { 
      this.spinner.show(SpinnerType.SquareJellyBox)
      const td : HTMLTableCellElement = this.element.nativeElement;
      this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {
        $(td.parentElement).animate({
          opacity:0,
          left:"+50",
          height:"toogle"
        },800,() =>{
          this.callback.emit();
          this.alertify.message("Sefer Başarıyla Silindi.", {
            dismissOther:true,
            messageType: MessageType.Success,
            position:Position.TopRight
          })
        })
      }, (errorResponse : HttpErrorResponse) => {
        this.alertify.message("Sefer Silinirken Hata Meydana Geldi.", {
          dismissOther:true,
          messageType: MessageType.Error,
          position:Position.TopRight
        })
      });
    }) 

  }

  openDialog(afterClosed : any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width:'500px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}
