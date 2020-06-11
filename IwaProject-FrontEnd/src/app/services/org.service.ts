import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Organiser} from '../models/organiser.model';
import {Stage} from '../models/stage.model';
import {Festival} from '../models/festival.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OrganiserService {

  private festsUrl = 'http://localhost:8080/festAdmins';

  constructor(private http: HttpClient) {
  }

  /** GET: get organisers from the server  */
  getOrganisers(): Observable<Organiser[]> {
    return this.http.get<Organiser[]>(this.festsUrl);
  }

  /** GET: get organiser by id. 404 if not found */
  getOrganiser(id: number): Observable<Organiser> {
    const url = `${this.festsUrl}/${id}`;
    return this.http.get<Organiser>(url).pipe(
      tap(_ => this.log(`fetched organiser id=${id}`)),
      catchError(this.handleError<Organiser>(`getOrganiser id=${id}`))
    );
  }

  /** GET: get Stages Organiser by id. 404 if not found */
  getFestivals(username: string): Observable<Festival[]> {
    const url = `${this.festsUrl}/${username}/festivals`;
    return this.http.get<Festival[]>(url).pipe(
      tap(_ => this.log(`fetched organisers fests id=${username}`)),
      catchError(this.handleError<Festival[]>(`getFestivals id=${username}`))
    );
  }

  /** POST: add a new organiser to the server */
  addFestivalToOrganiser(username: string, fest: Festival): Observable<Festival> {
    const url = `${this.festsUrl}/${username}/festivals`;
    return this.http.post<Festival>(url, fest, httpOptions).pipe(
      tap((festivalAdded: Festival) => this.log(`added stage id=${festivalAdded.id}`)),
      catchError(this.handleError<Festival>(`addFestivalToOrganiser`))
    );
  }

  /** DELETE: delete the organiser from the server */
  deleteOrganiser(organiser: Organiser | number): Observable<Organiser> {
    const id = typeof organiser === 'number' ? organiser : organiser.id;
    const url = `${this.festsUrl}/${id}`;

    return this.http.delete<Organiser>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted organiser id=${id}`)),
      catchError(this.handleError<Organiser>(`deleteOrganiser`))
    );
  }

  /** DELETE : Delete all the organisers */
  deleteAllOrganisers(): Observable<any> {
    return this.http.delete(this.festsUrl, httpOptions).pipe(
      tap(_ => this.log(`deleted organisers`)),
      catchError(this.handleError<any>(`deleteAllOrganiser`))
    );
  }

  /**
   * Handle Http operation that failed
   * Let the app continue
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  /** Log a OrganiserService message with the message service */
  private log(message: string) {
    console.log('OrganiserService: ' + message);
  }
}
