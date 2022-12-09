import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  constructor(private http: HttpClient) { }
  getAllSubCategory = (data:any): Observable<any> => {
    const endpoint = environment.backendUrl+'/api/subcategory/getAllSubCategory';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };
}
