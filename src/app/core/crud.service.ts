import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environmets/environment';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class CrudService<T> {
  apiUrl = environment.apiUrl;
  imageUrl = 'https://server.wegen.timesoftware.dev/api/uploads/';

  constructor(private http: HttpClient, private helperService: HelperService) {}

  getAll(endpoint: string): Observable<T[]> {
    const headers = this.helperService.getUserToken();
    return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`, { headers });
  }

  getById(endpoint: string, id: number): Observable<T> {
    const headers = this.helperService.getUserToken();
    return this.http.get<T>(`${this.apiUrl}/${endpoint}/${id}`, { headers });
  }

  create(endpoint: string, payload: T): Observable<T> {
    const headers = this.helperService.getUserToken();
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, payload, {
      headers,
    });
  }

  update(endpoint: string, id: number, payload: T): Observable<T> {
    const headers = this.helperService.getUserToken();
    return this.http.put<T>(`${this.apiUrl}/${endpoint}/${id}`, payload, {
      headers,
    });
  }
  updatee(endpoint: string, id: number, formData: FormData): Observable<T> {
    const headers = this.helperService.getUserToken();

    return this.http.put<T>(`${this.apiUrl}/${endpoint}/${id}`, formData, {
      headers,
    });
  }

  post(endpoint: string, formData: FormData): Observable<any> {
    const headers = this.helperService.getUserToken();
    return this.http.post(`${this.apiUrl}/${endpoint}`, formData, { headers });
  }

  delete(endpoint: string, id: number): Observable<void> {
    const headers = this.helperService.getUserToken();
    return this.http.delete<void>(`${this.apiUrl}/${endpoint}/${id}`, {
      headers,
    });
  }

  updateByQueryParam(
    endpoint: string,
    userId: number,
    queryParams: { [key: string]: any },
    payload: any
  ): Observable<T> {
    const headers = this.helperService.getUserToken();
    let url = `${this.apiUrl}/${endpoint}/${userId}`;

    const queryParamString = new URLSearchParams(queryParams as any).toString();
    if (queryParamString) {
      url += `?${queryParamString}`;
    }

    return this.http.put<T>(url, payload, { headers });
  }
}
