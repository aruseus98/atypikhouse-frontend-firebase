// To manages token and user information (username, email, roles) inside Browser’s Session Storage. 
// For Logout, we only need to clear this Session Storage.


import { Injectable } from '@angular/core';

//Setting up route guard
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';



@Injectable({
	providedIn: 'root'
})
export class TokenStorageService {

	currentUser: any;
	private roles: string[] = [];
	showAdminBoard = false;
	showOwnerBoard = false;

	constructor(private jwtHelper: JwtHelperService, private router: Router) { }


	signOut(): void {
		window.sessionStorage.clear();
	}

	public saveToken(token: string): void {
		window.sessionStorage.removeItem(TOKEN_KEY);
		window.sessionStorage.setItem(TOKEN_KEY, token);
	}

	public getToken(): string | null {
		return window.sessionStorage.getItem(TOKEN_KEY);
	}

	public saveUser(user: any): void {
		window.sessionStorage.removeItem(USER_KEY);
		window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
	}

	public getUser(): any {
		const user = window.sessionStorage.getItem(USER_KEY);
		if (user) {
			return JSON.parse(user);
		}
		return {};
	}

	//Vérifie si utilisateur identfié
	public isAuthenticated(): boolean {
		const token = window.sessionStorage.getItem(TOKEN_KEY)!;
		return !this.jwtHelper.isTokenExpired(token);
	}

	public isFullyAuthenticated(): boolean{
		this.currentUser = window.sessionStorage.getItem(TOKEN_KEY)!;
		let splitToken = this.currentUser.split('.')[1]
			let atobRes = JSON.parse(atob(splitToken));
			this.roles = atobRes.roles;
			console.log(this.roles);
		this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
		this.showOwnerBoard = this.roles.includes('ROLE_OWNER');
		if(!this.currentUser || !this.showAdminBoard){
			return false
		}
		else{
			return true;
		}
	}

	public isFullyAuthenticated2(): boolean{
		this.currentUser = window.sessionStorage.getItem(TOKEN_KEY)!;
		if(this.currentUser !=null ){
			let splitToken = this.currentUser.split('.')[1]
			let atobRes = JSON.parse(atob(splitToken));
			this.roles = atobRes.roles;
			console.log(this.roles);
			this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
			this.showOwnerBoard = this.roles.includes('ROLE_OWNER');
			if(splitToken != null){
				if(!this.currentUser || !this.showAdminBoard && !this.showOwnerBoard){
					return false
				}
				else{
					return true;
				}
			}
			else{
				return false
			}
		}
		return false
	}


}