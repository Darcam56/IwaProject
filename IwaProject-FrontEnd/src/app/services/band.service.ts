import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Band} from '../models/band.model';
import {Concert} from '../models/concert.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BandService {

  private bandsUrl = 'http://localhost:8080/bands';

  constructor(private http: HttpClient) { }

  /** GET: get bands from the server  */
  getBands(): Observable<Band[]> {
    return this.http.get<Band[]>(this.bandsUrl);
  }

  /** GET: get band by id. 404 if not found */
  getBand(id: number): Observable<Band> {
    const url = `${this.bandsUrl}/${id}`;
    return this.http.get<Band>(url).pipe(
      tap(_ => this.log(`fetched contact id=${id}`)),
      catchError(this.handleError<Band>(`getContact id=${id}`))
    );
  }

  /** GET: get concerts band by id. 404 if not found */
  getConcerts(username: string): Observable<Concert[]> {
    const url = `${this.bandsUrl}/${username}/concerts`;
    return this.http.get<Concert[]>(url).pipe(
      tap(_ => this.log(`fetched band =${username}`)),
      catchError(this.handleError<Concert[]>(`getConcerts =${username}`))
    );
  }

  /** PATCH: update a part of a band on the server */
  partialUpdateBand(band: Band | number, changesMap: Map<string, string>): Observable<any> {
    const id = typeof band === 'number' ? band : band.id;
    const url = `${this.bandsUrl}/${id}`;

    const body = {};
    for (const [key, value] of changesMap) { body[key] = value; }

    return this.http.patch(url, body, httpOptions).pipe(
      tap(_ => this.log(`updated band id=${id}`)),
      catchError(this.handleError<any>(`partialUpdateBand`))
    );
  }

  /** DELETE: delete the band from the server */
  deleteBand(band: Band | number): Observable<Band> {
    const id = typeof band === 'number' ? band : band.id;
    const url = `${this.bandsUrl}/${id}`;

    return this.http.delete<Band>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted band id=${id}`)),
      catchError(this.handleError<Band>(`deleteBand`))
    );
  }

  /** DELETE : Delete all the bands */
  deleteAllBands(): Observable<any> {
    return this.http.delete(this.bandsUrl, httpOptions).pipe(
      tap(_ => this.log(`deleted bans`)),
      catchError(this.handleError<any>(`deleteAllBands`))
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

  /** Log a BandService message with the message service */
  private log(message: string){
    console.log('BandService: ' + message);
  }
}
