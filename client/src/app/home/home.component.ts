import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
    ToastModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productService: ProductService) {}
  @ViewChild('paginator') paginator: Paginator | undefined;
  products: Product[] = [];
  total_items: number = 0;
  rows: number = 5;
  displayAddPopup = false;
  displayEditPopup = false;
  displayDeletePopup = false;
  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: 0,
    rating: 0,
  };

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }
    this.deleteProduct(product.id);
  }

  onConfirmeAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }
  onConfirmeEdit(product: Product) {
    this.editProduct(product, this.selectedProduct.id ?? 0);
    this.displayAddPopup = false;
  }

  onPageChange(event: any) {
    this.fetchProduct(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  addProduct(product: Product) {
    this.productService
      .addProducts('http://localhost:3000/clothes', product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProduct(0, this.rows);
          this.resetPaginator;
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.productService
      .editProducts(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProduct(0, this.rows);
          this.resetPaginator;
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  deleteProduct(id: number) {
    this.productService
      .deleteProducts(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProduct(0, this.rows);
          this.resetPaginator;
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  fetchProduct(page: number, perPage: number) {
    this.productService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (products: Products) => {
          this.products = products.items;
          this.total_items = products.total;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnInit() {
    this.fetchProduct(0, this.rows);
  }
}
