import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiServiceService{
    private readonly baseUrl = 'http://localhost:8090/api/v1';

  constructor(private _httpClient: HttpClient) { }
  submitGetRequest(url: string): Observable<any> {
    console.log(this.baseUrl + url);
    return this._httpClient.get<any>(this.baseUrl + url);
  }

  submitPostRequest(url: string, payload: any, headers?: object): Observable<any> {
    return this._httpClient.post<any>(this.baseUrl + url, payload, headers);

  }

  submitPutRequest(url: string, payload: any, headers?:object): Observable<any> {
    return this._httpClient.put<any>(this.baseUrl + url, payload, headers);
  }

  submitDeleteRequest(url: string, options?: any): Observable<any> {
    return this._httpClient.delete<any>(this.baseUrl + url, options);
  }
}