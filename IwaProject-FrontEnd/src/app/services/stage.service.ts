import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Stage} from '../models/stage.model';
import {Concert} from '../models/concert.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class StageService {

  private festsUrl = 'http://localhost:8080/stages';

  constructor(private http: HttpClient) {
  }

  /** GET: get stages from the server  */
  getStages(): Observable<Stage[]> {
    return this.http.get<Stage[]>(this.festsUrl);
  }

  /** GET: get stage by id. 404 if not found */
  getStage(id: number): Observable<Stage> {
    const url = `${this.festsUrl}/${id}`;
    return this.http.get<Stage>(url).pipe(
      tap(_ => this.log(`fetched stage id=${id}`)),
      catchError(this.handleError<Stage>(`getStage id=${id}`))
    );
  }

  /** GET: get Concerts Stage by id. 404 if not found */
  getConcerts(id: number): Observable<Concert[]> {
    const url = `${this.festsUrl}/${id}/concerts`;
    return this.http.get<Concert[]>(url).pipe(
      tap(_ => this.log(`fetched concerts id=${id}`)),
      catchError(this.handleError<Concert[]>(`getConcerts id=${id}`))
    );
  }

  /** POST: add a new stage to the server */
  addConcertInStage(id: number, concert: Concert): Observable<Concert> {
    const url = `${this.festsUrl}/${id}/concerts`;
    return this.http.post<Concert>(url, concert, httpOptions).pipe(
      tap((concertAdded: Concert) => this.log(`added stage id=${concertAdded.id}`)),
      catchError(this.handleError<Concert>(`addConcert`))
    );
  }

  /** PATCH: update a part of a stage on the server */
  partialUpdateStage(stage: Stage | number, changesMap: Map<string, string>): Observable<any> {
    const id = typeof stage === 'number' ? stage : stage.id;
    const url = `${this.festsUrl}/${id}`;

    const body = {};
    for (const [key, value] of changesMap) {
      body[key] = value;
    }

    return this.http.patch(url, body, httpOptions).pipe(
      tap(_ => this.log(`updated stage id=${id}`)),
      catchError(this.handleError<any>(`partialUpdateStage`))
    );
  }

  /** DELETE: delete the stage from the server */
  deleteStage(stage: Stage | number): Observable<Stage> {
    const id = typeof stage === 'number' ? stage : stage.id;
    const url = `${this.festsUrl}/${id}`;

    return this.http.delete<Stage>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted stage id=${id}`)),
      catchError(this.handleError<Stage>(`deleteStage`))
    );
  }

  /** DELETE : Delete all the stages */
  deleteAllStages(): Observable<any> {
    return this.http.delete(this.festsUrl, httpOptions).pipe(
      tap(_ => this.log(`deleted stages`)),
      catchError(this.handleError<any>(`deleteAllStage`))
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

  /** Log a StageService message with the message service */
  private log(message: string) {
    console.log('StageService: ' + message);
  }
}
