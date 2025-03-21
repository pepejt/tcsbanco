import { Component } from '@angular/core';
import { ProductService } from './services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductInterface } from './interfaces/product.interface';
import { SlicePipe } from '@angular/common';
import { DateformatPipe } from './pipes/dateformat.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SlicePipe, DateformatPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'banco';
  products : ProductInterface[] = [];
  productsAll: ProductInterface[] = [];
  pageSize = 5;


  constructor(
    private productService: ProductService
  ){
    this.productService.getProducts().subscribe({
      next: (res: ProductInterface[]) => {
        this.products = res;
        this.productsAll = res;
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
      }
    });
  }

  filterProducts(event: any) {
    var value = event.target.value.toLowerCase();
    this.products = this.productsAll.filter(product =>
      product.name.toLowerCase().includes(value)||
      product.description.toLowerCase().includes(value)
    );
  }

  pageSizeChange(event: any) {
    this.pageSize = event.target.value;
  }
}
