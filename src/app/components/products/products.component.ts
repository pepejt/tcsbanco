import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SlicePipe } from '@angular/common';
import { DateformatPipe } from '../../pipes/dateformat.pipe';
import { ProductInterface } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { DlgConfirmationComponent } from '../../commons/dlg-confirmation/dlg-confirmation.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SlicePipe, DateformatPipe,
    DlgConfirmationComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  title = 'banco';
  products : ProductInterface[] = [];
  productsAll: ProductInterface[] = [];
  pageSize = 5;
  showMenu = false;
  position = {left: 0, top: 0};
  selectedProduct?: ProductInterface;
  openDialog= false;
  error?:string

  constructor(
    private productService: ProductService,
    private router: Router
  ){
    this.productService.getProducts().subscribe({
      next: (res: ProductInterface[]) => {
        this.products = res;
        this.productsAll = res;
      },
      error: (e: HttpErrorResponse) => {
        this.error = "..."
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

  onCreate() {
    this.router.navigateByUrl("/product");
  }

  onEdit() {
    if (this.selectedProduct == null) {
      return;
    }
    this.router.navigateByUrl("/product", {state: this.selectedProduct});
  }

  onDelete() {
    if (this.selectedProduct == null) {
      return;
    }
    this.error = "";

    this.productService.delete(this.selectedProduct.id).subscribe({
      next: (res: any) => {
        this.products = this.products.filter(p => p.id != this.selectedProduct?.id);
        this.productsAll = this.productsAll.filter(p => p.id != this.selectedProduct?.id);
        this.openDialog = false;
      },
      error: (e: HttpErrorResponse) => {
        if (e.status === 404){
          this.error = "El registro que desea eliniar ya no existe"
        }else{
          this.error= e.error.message;
        }
      }
    });
  }

  onConfirmDelete(){
    this.openDialog = true;
    this.showMenu = false;
  }
  onCancel(){
    this.openDialog = false;
  }

  onOption(product: ProductInterface, event: any) {
    console.log(product);
    this.selectedProduct = product;
    this.position = {
      left:event.clientX,
      top:event.clientY
    }
    console.log(this.position);
    this.showMenu=true;
  }
}
