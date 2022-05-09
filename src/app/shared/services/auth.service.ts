import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient) { }

	login(data: any): Observable<any> {
		return this.http.post<any>( `http://localhost:8000/api/users`, data);
	}

	register(data: any): Observable<any> {
		return this.http.post<any>( `http://localhost:8000/api/users`, data);
	}

}
