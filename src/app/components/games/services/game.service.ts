import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Game } from '../model/game';

const baseUrl = "http://localhost:7070/v1/games/"

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Game[]>{
    return this.httpClient.get<Game[]>(baseUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getFromId(id: number): Observable<Game>{
    return this.httpClient.get<Game>(`${baseUrl}${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  add(cns: Game): Observable<Game>{
    return this.httpClient.post<Game>(baseUrl, cns).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  remove(cns: Game): Observable<Console>{
    return this.httpClient.delete<Console>(`${baseUrl}${cns.id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  update(cns: Game){
    return this.httpClient.put<Game>(baseUrl, cns).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
