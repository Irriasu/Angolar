import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParam, Products } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  getProducts = (
    url: string,
    params: PaginationParam
  ): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };

  addProducts = (url: string, body: any): Observable<Products> => {
    return this.apiService.post(url, body, {});
  };

  editProducts = (url: string, body: any): Observable<Products> => {
    return this.apiService.put(url, body, {});
  };

  deleteProducts = (url: string): Observable<Products> => {
    return this.apiService.delete(url, {});
  };
}
