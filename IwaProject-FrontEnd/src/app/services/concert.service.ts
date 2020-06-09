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

  /** GET: get contacts from the server  */
  getContacts(): Observable<Concert[]> {
    return this.http.get<Concert[]>(this.concertsUrl);
  }

  /** GET: get contact by id. 404 if not found */
  getContact(id: number): Observable<Concert> {
    const url = `${this.concertsUrl}/${id}`;
    return this.http.get<Concert>(url).pipe(
      tap(_ => this.log(`fetched contact id=${id}`)),
      catchError(this.handleError<Concert>(`getContact id=${id}`))
    );
  }

  /** PUT: update the contact on the server */
  updateContact(contact: Concert): Observable<any> {
    const url = `${this.concertsUrl}/${contact.id}`;
    return this.http.put(url, contact, httpOptions).pipe(
      tap(_ => this.log(`updated contact id=${contact.id}`)),
      catchError(this.handleError<any>(`updateContact`))
    );
  }

  /** PUT: update all the contacts on the server */
  updateContacts(putContactList: Concert[]): Observable<any> {
    return this.http.put(this.concertsUrl , putContactList, httpOptions).pipe(
      tap(_ => this.log(`updated contacts`)),
      catchError(this.handleError<any>(`updateContacts`))
    );
  }

  /** POST: add a new contact to the server */
  addContact(contact: Concert): Observable<Concert> {
    return this.http.post<Concert>(this.concertsUrl, contact, httpOptions).pipe(
      tap((contactAdded: Concert) => this.log(`added contact id=${contactAdded.id}`)),
      catchError(this.handleError<Concert>(`addContact`))
    );
  }

  /** PATCH: update a part of a contact on the server */
  partialUpdateContact(contact: Concert | number, changesMap: Map<string, string>): Observable<any> {
    const id = typeof contact === 'number' ? contact : contact.id;
    const url = `${this.concertsUrl}/${id}`;

    const body = {};
    for (const [key, value] of changesMap) { body[key] = value; }

    return this.http.patch(url, body, httpOptions).pipe(
      tap(_ => this.log(`updated contact id=${id}`)),
      catchError(this.handleError<any>(`partialUpdateContact`))
    );
  }

  /** DELETE: delete the contact from the server */
  deleteContact(contact: Concert | number): Observable<Concert> {
    const id = typeof contact === 'number' ? contact : contact.id;
    const url = `${this.concertsUrl}/${id}`;

    return this.http.delete<Concert>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted contact id=${id}`)),
      catchError(this.handleError<Concert>(`deleteContact`))
    );
  }

  /** DELETE : Delete all the contacts */
  deleteAllContacts(): Observable<any> {
    return this.http.delete(this.concertsUrl, httpOptions).pipe(
      tap(_ => this.log(`deleted contacts`)),
      catchError(this.handleError<any>(`deleteAllContact`))
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

  /** Log a ContactService message with the message service */
  private log(message: string){
    console.log('ContactService: ' + message);
  }
}
