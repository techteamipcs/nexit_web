import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient) { }

  getpageWithName = (moreData:any): Observable<any> => {
    const endpoint = environment.backendUrl+'/api/home/getpagewithName';   
    return this.http
      .post(endpoint, moreData, { observe: 'response' as 'body' })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getHomepageWithName = (moreData:any): Observable<any> => {
    const endpoint = environment.backendUrl+'/api/home/gethomepagewithName';   
    return this.http
      .post(endpoint, moreData, { observe: 'response' as 'body' })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getAboutNoticeDetails = (data:any): Observable<any> => {
    const endpoint = environment.backendUrl+'/api/home/frountAboutNoticeDetails';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

}
