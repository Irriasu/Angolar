import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, RatingModule,ButtonModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  //===[Inputs]===//
  @Input() display: boolean = false;
  @Input() header!: string;
  @Input() product: Product = {
    name: '',
    image: '',
    price: 0,
    rating: 0,
  };
  //===[Outputs]===//
  @Output() confirm = new EventEmitter<Product>();
  @Output() displayChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  //===[Methodes]===//

  onConfirm() {
    this.confirm.emit(this.product);
    this.display = false;
    this.displayChange.emit(this.display);
  }
  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
