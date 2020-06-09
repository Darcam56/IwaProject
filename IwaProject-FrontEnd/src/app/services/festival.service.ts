import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Festival} from '../models/festival.model';
import {Stage} from '../models/stage.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class FestivalService {

  private festsUrl = 'http://localhost:8080/festivals';

  constructor(private http: HttpClient) {
  }

  /** GET: get festivals from the server  */
  getFestivals(): Observable<Festival[]> {
    return this.http.get<Festival[]>(this.festsUrl);
  }

  /** GET: get festival by id. 404 if not found */
  getFestival(id: number): Observable<Festival> {
    const url = `${this.festsUrl}/${id}`;
    return this.http.get<Festival>(url).pipe(
      tap(_ => this.log(`fetched festival id=${id}`)),
      catchError(this.handleError<Festival>(`getFestival id=${id}`))
    );
  }

  /** GET: get Stages Festival by id. 404 if not found */
  getStages(id: number): Observable<Stage[]> {
    const url = `${this.festsUrl}/${id}/stages`;
    return this.http.get<Stage[]>(url).pipe(
      tap(_ => this.log(`fetched festivals stages id=${id}`)),
      catchError(this.handleError<Stage[]>(`getFestival id=${id}`))
    );
  }

  /** POST: add a new festival to the server */
  addStageInFestival(id: number, stage: Stage): Observable<Stage> {
    const url = `${this.festsUrl}/${id}/stages`;
    return this.http.post<Stage>(url, stage, httpOptions).pipe(
      tap((stageAdded: Stage) => this.log(`added stage id=${stageAdded.id}`)),
      catchError(this.handleError<Stage>(`addFestival`))
    );
  }

  /** PATCH: update a part of a festival on the server */
  partialUpdateFestival(festival: Festival | number, changesMap: Map<string, string>): Observable<any> {
    const id = typeof festival === 'number' ? festival : festival.id;
    const url = `${this.festsUrl}/${id}`;

    const body = {};
    for (const [key, value] of changesMap) {
      body[key] = value;
    }

    return this.http.patch(url, body, httpOptions).pipe(
      tap(_ => this.log(`updated festival id=${id}`)),
      catchError(this.handleError<any>(`partialUpdateFestival`))
    );
  }

  /** DELETE: delete the festival from the server */
  deleteFestival(festival: Festival | number): Observable<Festival> {
    const id = typeof festival === 'number' ? festival : festival.id;
    const url = `${this.festsUrl}/${id}`;

    return this.http.delete<Festival>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted festival id=${id}`)),
      catchError(this.handleError<Festival>(`deleteFestival`))
    );
  }

  /** DELETE : Delete all the festivals */
  deleteAllFestivals(): Observable<any> {
    return this.http.delete(this.festsUrl, httpOptions).pipe(
      tap(_ => this.log(`deleted festivals`)),
      catchError(this.handleError<any>(`deleteAllFestival`))
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

  /** Log a FestivalService message with the message service */
  private log(message: string) {
    console.log('FestivalService: ' + message);
  }
}
