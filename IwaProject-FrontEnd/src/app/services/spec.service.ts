import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Spectator} from '../models/spec.model';
import {catchError, tap} from 'rxjs/operators';
import {Festival} from '../models/festival.model';
import {Stage} from '../models/stage.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class SpecService {

  private specsUrl = 'http://localhost:8080/festGoers';

  constructor(private http: HttpClient) { }

  /** GET: get specs from the server  */
  getSpectators(): Observable<Spectator[]> {
    return this.http.get<Spectator[]>(this.specsUrl);
  }

  /** GET: get spec by id. 404 if not found */
  getSpectator(id: number): Observable<Spectator> {
    const url = `${this.specsUrl}/${id}`;
    return this.http.get<Spectator>(url).pipe(
      tap(_ => this.log(`fetched contact id=${id}`)),
      catchError(this.handleError<Spectator>(`getSpectator id=${id}`))
    );
  }

  /** GET: get spectators fests by username. 404 if not found */
  getFests(username: string): Observable<Festival[]> {
    const url = `${this.specsUrl}/${username}/festivals`;
    return this.http.get<Festival[]>(url).pipe(
      tap(_ => this.log(`fetched spec =${username}`)),
      catchError(this.handleError<Festival[]>(`getFests =${username}`))
    );
  }

  /** POST: link a festival and an spectator to the server */
  linkSpecToFestival(username: string, festId: number): Observable<Spectator> {
    const url = `${this.specsUrl}/${username}/festivals/${festId}`;
    return this.http.post(url, httpOptions).pipe(
      tap((spectatorAdded: Spectator) => this.log(`added spec id=${spectatorAdded.id}`)),
      catchError(this.handleError<Spectator>(`linkSpecToFestival`))
    );
  }

  /** PATCH: update a part of a spec on the server */
  partialUpdateSpectator(spec: Spectator | number, changesMap: Map<string, string>): Observable<any> {
    const id = typeof spec === 'number' ? spec : spec.id;
    const url = `${this.specsUrl}/${id}`;

    const body = {};
    for (const [key, value] of changesMap) { body[key] = value; }

    return this.http.patch(url, body, httpOptions).pipe(
      tap(_ => this.log(`updated spec id=${id}`)),
      catchError(this.handleError<any>(`partialUpdateSpectator`))
    );
  }

  /** DELETE: delete the spec from the server */
  deleteSpectator(spec: Spectator | number): Observable<Spectator> {
    const id = typeof spec === 'number' ? spec : spec.id;
    const url = `${this.specsUrl}/${id}`;

    return this.http.delete<Spectator>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted spec id=${id}`)),
      catchError(this.handleError<Spectator>(`deleteSpectator`))
    );
  }

  /** DELETE : Delete all the specs */
  deleteAllSpectators(): Observable<any> {
    return this.http.delete(this.specsUrl, httpOptions).pipe(
      tap(_ => this.log(`deleted bans`)),
      catchError(this.handleError<any>(`deleteAllSpectators`))
    );
  }

  /** DELETE: Delete the link between a festival and an spectator to the server */
  unlinkSpecToFestival(username: string, festId: number): Observable<Spectator> {
    const url = `${this.specsUrl}/${username}/festivals/${festId}`;
    return this.http.delete(url, httpOptions).pipe(
      tap((spectatorAdded: Spectator) => this.log(`added spec id=${spectatorAdded.id}`)),
      catchError(this.handleError<Spectator>(`unlinkSpecToFestival`))
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

  /** Log a SpectatorService message with the message service */
  private log(message: string){
    console.log('SpectatorService: ' + message);
  }
}
