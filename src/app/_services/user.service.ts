// This service provides methods to access public and protected resources.

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../shared/models/user.model';

const API_URL = 'https://radiant-reaches-08673.herokuapp.com/api';
const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpOptionsPatch = {
	headers: new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' })
};

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpClient) { }

	getUserBoard(): Observable<any> {
		return this.http.get(API_URL + '/users/me', { responseType: 'json' });
	}

	getModeratorBoard(): Observable<any> {
		return this.http.get(API_URL + '/users/me', { responseType: 'text' });
	}

	getAdminBoard(): Observable<any> {
		return this.http.get(API_URL + '/users/me', { responseType: 'text' });
	}

	patchUserInfo(id:number, email:string, password:string, firstName:string, lastName:string): Observable<any> {
		return this.http.patch(API_URL + '/users/' + id, {
			email,
			password,
			firstName,
			lastName
		}, httpOptionsPatch);
	}

	getUserInfo(id:number): Observable<any> {
		return this.http.get(API_URL + '/users/' + id, { responseType: 'json' })
	}

	getAllUsers(): Observable<any> {
		return this.http.get(API_URL + '/users', { responseType: 'json' })
	}
	
	// getUser(id: number): Observable<any>{
	// 	return this.getAllUsers()['hydra:member'].map(users => users.find(user => user.id == id));
	// }
}