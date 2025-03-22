import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dlg-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './dlg-confirmation.component.html',
  styleUrl: './dlg-confirmation.component.css'
})
export class DlgConfirmationComponent {
  @Input() name?: string = '';
  @Input() open?: boolean
  @Output() yesClick = new EventEmitter<void>()
  @Output() cancelClick = new EventEmitter<void>()

  show(){
    this.open = true;
  }
  onYes(){
      this.yesClick.emit()
  }
  onCancel(){
      this.cancelClick.emit()
  }
}
