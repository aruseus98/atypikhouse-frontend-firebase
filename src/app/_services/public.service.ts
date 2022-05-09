//This service sends signup, login HTTP POST requests to back-end.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://radiant-reaches-08673.herokuapp.com/api';

@Injectable({
	providedIn: 'root'
})

export class PublicService {

	constructor(private http: HttpClient, private handler: HttpBackend) {
		// this.http = new HttpClient(this.handler);
	}

	getLodgings(): Observable<any> {
		let req = this.http = new HttpClient(this.handler);
		return req.get(API_URL + '/lodgings', { responseType: 'json' });
	}

	getLodgingId(id: number): Observable<any> {
		let req = this.http = new HttpClient(this.handler);
		return req.get(API_URL + '/lodgings/' +  id, { responseType: 'json' });
	}
}