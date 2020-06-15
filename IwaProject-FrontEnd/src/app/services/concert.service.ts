import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Concert} from '../models/concert.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ConcertService {

  private concertsUrl = 'http://localhost:8080/concerts';

  constructor(private http: HttpClient) { }

  /** GET: get concerts from the server  */
  getConcerts(): Observable<Concert[]> {
    return this.http.get<Concert[]>(this.concertsUrl);
  }

  /** GET: get concert by id. 404 if not found */
  getConcert(id: number): Observable<Concert> {
    const url = `${this.concertsUrl}/${id}`;
    return this.http.get<Concert>(url).pipe(
      tap(_ => this.log(`fetched concert id=${id}`)),
      catchError(this.handleError<Concert>(`getConcert id=${id}`))
    );
  }

  /** POST: link a concert to a Band bi Ids */
  linkConcertToBand(idC: number, idB: number): Observable<any> {
    const url = `${this.concertsUrl}/${idC}/band/${idB}`;
    return this.http.post(url, null).pipe(
      tap(_ => this.log(`linked concert (${idC}) with band (${idB})`)),
      catchError(this.handleError<any>(`linkConcertToBand`))
    );
  }

  /** PUT: update the concert on the server */
  updateConcert(concert: Concert): Observable<any> {
    const url = `${this.concertsUrl}/${concert.id}`;
    return this.http.put(url, concert, httpOptions).pipe(
      tap(_ => this.log(`updated concert id=${concert.id}`)),
      catchError(this.handleError<any>(`updateConcert`))
    );
  }

  /** PUT: update all the concerts on the server */
  updateConcerts(putConcertList: Concert[]): Observable<any> {
    return this.http.put(this.concertsUrl , putConcertList, httpOptions).pipe(
      tap(_ => this.log(`updated concerts`)),
      catchError(this.handleError<any>(`updateConcerts`))
    );
  }

  /** PATCH: update a part of a concert on the server */
  partialUpdateConcert(concert: Concert | number, changesMap: Map<string, string>): Observable<any> {
    const id = typeof concert === 'number' ? concert : concert.id;
    const url = `${this.concertsUrl}/${id}`;

    const body = {};
    for (const [key, value] of changesMap) { body[key] = value; }

    console.log(body);

    return this.http.patch(url, body, httpOptions).pipe(
      tap(_ => this.log(`updated concert id=${id}`)),
      catchError(this.handleError<any>(`partialUpdateConcert`))
    );
  }

  /** DELETE: delete the concert from the server */
  deleteConcert(concert: Concert | number): Observable<Concert> {
    const id = typeof concert === 'number' ? concert : concert.id;
    const url = `${this.concertsUrl}/${id}`;

    return this.http.delete<Concert>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted concert id=${id}`)),
      catchError(this.handleError<Concert>(`deleteConcert`))
    );
  }

  /** DELETE : Delete all the concerts */
  deleteAllConcerts(): Observable<any> {
    return this.http.delete(this.concertsUrl, httpOptions).pipe(
      tap(_ => this.log(`deleted concerts`)),
      catchError(this.handleError<any>(`deleteAllConcert`))
    );
  }

  /**
   * Handle Http operation that failed
   * Let the app continue
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of (result as T);
    };
  }

  /** Log a ConcertService message with the message service */
  private log(message: string){
    console.log('ConcertService: ' + message);
  }
}
