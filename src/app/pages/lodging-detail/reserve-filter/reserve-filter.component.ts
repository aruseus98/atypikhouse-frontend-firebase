import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
	selector: 'app-reserve-filter',
	templateUrl: './reserve-filter.component.html',
	styleUrls: ['./reserve-filter.component.scss']
})
export class ReserveFilterComponent implements OnInit {
	private roles: string[] = [];
	isLoggedIn = false;
	showAdminBoard = false;
	showModeratorBoard = false;
	username?: string;

	reserveForm: FormGroup

	constructor(private formBuilder: FormBuilder, private route:ActivatedRoute,private router:Router, private tokenStorageService: TokenStorageService ) {
		
		this.reserveForm = this.formBuilder.group(
			{
				dateDepart: ['', [Validators.required]],
				dateArrivee: ['', [Validators.required]],
				nbAdulte: [0, [Validators.required]],
				nbEnfant: [0, [Validators.required]],
			}
		)
	}

	ngOnInit(): void {
		this.isLoggedIn = !!this.tokenStorageService.getToken();
		if (this.isLoggedIn) {
		  const user = this.tokenStorageService.getUser();
		  //this.roles = user.roles;
		  //this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
		  //this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
		  this.username = user.username;
		}
	}

	onSubmit() {
		
		console.log(this.reserveForm.value);

		if(this.isLoggedIn){
			this.router.navigate(['/paiement']);
		}
		else{
			this.router.navigate(['/login']);
		}

		// this.authService.register(this.reserveForm.value)
		// .subscribe(res => {
			
		// 	if (res.firstName) {
		// 		console.log("gg");
		// 	}
			
		// })
	}

}
