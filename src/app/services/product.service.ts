import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../env';
import { map, Observable } from 'rxjs';
import { ResponseInterface } from '../interfaces/response.interface';
import { ProductInterface } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = env.urlApi+'/bp/products';
  constructor(
    private httpClient: HttpClient
  ) { }

  getProducts(): Observable<ProductInterface[]> {
    return this.httpClient.get<ResponseInterface>(this.url).pipe(
      map (
        (res: ResponseInterface) => res.data
      )
    )
  }

  create(product: ProductInterface) {
    return this.httpClient.post(this.url, product);
  }
  update(id: string, product: ProductInterface) {
    return this.httpClient.put(`${this.url}/${id}`, product);
  }
  delete(id: string) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
