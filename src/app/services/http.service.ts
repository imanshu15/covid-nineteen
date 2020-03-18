import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { ErrorMessageHandler } from '../helpers/error-handler';
/**
 * Service - ApiService
 *
 * Handles all HTTP server communication
 */
@Injectable()
export class HttpService {

  // tslint:disable-next-line: variable-name
  private api_url = `${environment.api_base_url}`;
  constructor(
    private http: HttpClient, private errorHandler: ErrorMessageHandler
  ) {
  }

  /**
   * Get default headers for a request
   */
  get headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }


  private handleError(error: HttpErrorResponse, handler: ErrorMessageHandler) {
    console.error(error);
    if (error.error instanceof ProgressEvent) {
      handler.showMessage(error.error);
    } else {
      handler.showMessage(error.error);
      return throwError(
        error.message
      );
    }
    return throwError(
      'Could not connect to remote server.'
    );
  }


  get(path: string): Observable<any> {
    return this.http
      .get<any>(`${this.api_url}${path}`, { headers: this.headers })
      .pipe(
        catchError(err => this.handleError(err, this.errorHandler))
      );
  }

  // tslint:disable-next-line: ban-types
  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put<any>(`${this.api_url}${path}`, JSON.stringify(body), { headers: this.headers })
      .pipe(
        catchError(err => this.handleError(err, this.errorHandler))
      );
  }


  // tslint:disable-next-line: ban-types
  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post<any>(`${this.api_url}${path}`, JSON.stringify(body), { headers: this.headers }
    )
    .pipe(
      catchError(err => this.handleError(err, this.errorHandler))
    );
  }


  delete(path: string): Observable<any> {
    return this.http
      .delete<any>(`${this.api_url}${path}`, { headers: this.headers })
      .pipe(
        catchError(err => this.handleError(err, this.errorHandler))
      );
  }


  uploadFile(path: string, name: string, files: FileList): Observable<any> {
    const formData: FormData = new FormData();
    formData.append(name, files[0], files[0].name);

    return this.http
      .post<any>(`${this.api_url}${path}`, formData, { headers: this.headers })
      .pipe(
        catchError(err => this.handleError(err, this.errorHandler))
      );
  }

  getFile(path: string, request: any): Observable<Blob> {
    return this.http
      .post(`${this.api_url}${path}`, request,  {responseType: 'blob'});
  }
}
