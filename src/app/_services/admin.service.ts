//This service sends signup, login HTTP POST requests to back-end.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://radiant-reaches-08673.herokuapp.com/api';
const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsPatch = {
	headers: new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' })
};
@Injectable({
	providedIn: 'root'
})
export class AdminService {

	constructor(private http: HttpClient) { }


	createCategory(type: string): Observable<any> {
		return this.http.post(AUTH_API + '/categories', {
			type
		}, httpOptions);
	}

	getAllCategory(): Observable<any> {
		return this.http.get(AUTH_API + '/categories', { responseType: 'json'});
	}

	getCurrentUserByOwnerId(id: number): Observable<any> {
		return this.http.get(AUTH_API + '/users/' + id + '/owner/' , { responseType: 'json'});
	}

	getallUsers(): Observable<any> {
		return this.http.get(AUTH_API + '/users', { responseType: 'text'});
	}

	editLodgings(id:number, name: string, rate: number, description: string, address: string, owner: string, category: string): Observable<any> {
		return this.http.patch(AUTH_API + '/lodgings/' + id, { 
			name,
			rate,
			description,
			address,
			owner,
			category
		}, httpOptionsPatch );
	}
}