import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TextEncoderService {
  private baseUrl = 'http://localhost:5113/api/text/encode';

  constructor(private http: HttpClient) { }

  encodeText(text: string, cancel$: Subject<void>): Observable<ArrayBuffer> {
    const url = this.baseUrl;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'arraybuffer' as 'json', 
    };

    return this.http.post<ArrayBuffer>(url, { text }, options).pipe(
      takeUntil(cancel$),
      catchError(error => {
        console.error('An error occurred:', error);
        throw error;
      }),
      catchError(() => new Observable<ArrayBuffer>())
    );
  }
}
