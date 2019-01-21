import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Define the internal Subject we'll use to push the command count
  public pendingCommandsSubject = new Subject<number>();
  public pendingCommandCount = 0;

  // Provide the *public* Observable that clients can subscribe to
  public pendingCommands$: Observable<number>;

  constructor(public http: HttpClient,
    private inj: Injector
  ) {
    this.pendingCommands$ = this.pendingCommandsSubject.asObservable();
  }

  public get<T>(url: string, params?: any): Observable<T> {
    return this.http.get<T>(url, { params: this.buildUrlSearchParams(params) });
  }

  public getEntities(url: string, params?: any): Observable<any[]> {
    return this.http.get<any[]>(url, { params: this.buildUrlSearchParams(params) });
  }

  public getFull<T>(url: string): Observable<HttpResponse<T>> {
    return this.http.get<T>(url, { observe: 'response' });
  }

  public post<T>(url: string, data?: any, params?: any): Observable<T> {
    return this.http.post<T>(url, data, { params: params });
  }

  public put<T>(url: string, data?: any, params?: any): Observable<T> {
    return this.http.put<T>(url, data, { params: params });
  }

  public delete<T>(url: string, params?: any): Observable<T> {
    return this.http.delete<T>(url);
  }

  private buildUrlSearchParams(params: any): HttpParams {
    const searchParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        searchParams.append(key, params[key]);
      }
    }
    return searchParams;
  }
}
