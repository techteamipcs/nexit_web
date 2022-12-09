import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAllSubCategory = (data:any): Observable<any> => {
    const endpoint = environment.backendUrl+'/api/subcategory/getAllSubCategory';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  getAllCategory = (data:any): Observable<any> => {
    const endpoint = environment.backendUrl+'/api/category/getAllCategory';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  getAllBrands = (data:any): Observable<any> => {
    const endpoint = environment.backendUrl+'/api/brand/getAllBrand';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  getAllProducts = (data:any): Observable<any> => {
    const endpoint = environment.backendUrl+'/api/product/getallProducts';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  getProductByID = (data:any): Observable<any> => {
    const endpoint = environment.backendUrl+'/api/product/getsingleproduct';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  getFilteredProducts = (data:any): Observable<any> => {
    const endpoint = environment.backendUrl+'/api/product/getProductsbyFilter';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };


}
