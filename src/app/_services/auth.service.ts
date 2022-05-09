//This service sends signup, login HTTP POST requests to back-end.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://radiant-reaches-08673.herokuapp.com/api';
const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient) { }


	login(username: string, password: string): Observable<any> {
		return this.http.post(AUTH_API + '/login', {
			username,
			password
		}, httpOptions);
	}

	register(email:string, password:string, firstName:string, lastName:string, photo:string): Observable<any> {
		return this.http.post(AUTH_API + '/users', {
			email,
			password,
			firstName,
			lastName,
			photo
		}, httpOptions);
	}

	getCurrentUser(): Observable<any> {
		return this.http.get(AUTH_API + '/users/me', { responseType: 'json'});
	}

	offre(name: string, rate: number, description: string, address: string, owner: string, category: string): Observable<any> {
		return this.http.post(AUTH_API + '/lodgings', {
			name,
			rate,
			description,
			address,
			owner,
			category
		}, httpOptions);
	}

}