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

  save(product: any, id?: string): Observable<ProductInterface> {
    if (product.id){
      return this.httpClient.post<ProductInterface>(this.url, product);
    }else{
      return this.httpClient.put<ProductInterface>(`${this.url}/${id}`, product);
    }
  }

  delete(id: string): Observable<ResponseInterface> {
    return this.httpClient.delete<ResponseInterface>(`${this.url}/${id}`);
  }

  exist(id?: string):Observable<boolean>{
    return this.httpClient.get<boolean>(`${this.url}/verification/${id}`);
  }
}
