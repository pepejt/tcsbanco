import { Routes } from '@angular/router';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
  { path: 'product/:id', component: ProductEditComponent},
  { path: 'product', component: ProductEditComponent},
  { path: '', component: ProductsComponent},
];
