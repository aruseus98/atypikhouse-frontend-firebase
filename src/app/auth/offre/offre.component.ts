import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category.model';
import { AdminService } from 'src/app/_services/admin.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
	selector: 'app-offre',
	templateUrl: './offre.component.html',
	styleUrls: ['./offre.component.scss']
})
export class OffreComponent implements OnInit {
	title = 'Créez votre annonce | Atypik House | Location de logement | France';
	isSuccessful = false;
	isSignUpFailed = false;
	errorMessage = '';
	isLoginFailed = false;
	isLoggedIn = false;
	isSubmit = false;

	categories: Category[] = [];
	//currentUser?: User;
	currentUser: any;
	id?: number;
	content: any;

	alert: boolean = false;

	userForm: FormGroup;

	frmFinish: FormGroup;

	nom!: string;
	prenom!: string;
	adresse!: string;
	email: string | undefined;
	message: string | undefined;
	prix!: string;
	category!: string;
	owner!: string;

	tokenBackend!: string;
	roles: string[] = [];
	currentUserIdFromToken?: number;
	currentOwnerId?: string;




	constructor(private formBuilder: FormBuilder,
		private adminService: AdminService,
		private metaService: Meta,
		private titleService: Title,
		private recaptchaV3Service: ReCaptchaV3Service,
		private authService: AuthService,
		private userService: UserService,
		private token: TokenStorageService,
		private router: Router) {


		this.frmFinish = this.formBuilder.group({});
		this.addTag();
		this.titleService.setTitle(this.title);

		this.userForm = this.formBuilder.group({
			name: ['', [Validators.required]],
			address: ['', [Validators.required]],
			category: ['', [Validators.required]],
			rate: ['', [Validators.required]],
			// owner: [''],
			description: ['', [Validators.required]]
		});
	}

	public send(form: NgForm): void {
		this.recaptchaV3Service.execute('importantAction')
			.subscribe((token) => this.handleToken(token));
	}
	handleToken(token: string): void {
		this.recaptchaV3Service.execute('importantAction')
			.subscribe((token: string) => {
				console.log(`[${token}]`);
			});
	}


	// Définition des différentes balises pour le SEO
	addTag() {
		this.metaService.addTag({ httpEquiv: 'Content-Type', content: 'text/html' }); // Indique aux agents et serveurs de prendre le contenu de cette page en tant que HTML
		this.metaService.addTag({ name: 'description', content: 'Créez votre annonce ! Atypik House, site de location de logement insolite en France' }); // Meta description de la page
		this.metaService.addTag({ property: 'og-type', content: "Site web" }); // Indique le type de l'objet
		this.metaService.addTag({ name: 'robots', content: 'noindex, nofollow' }); // Permet au robot d'indexer la page
		/* this.metaService.addTag({ property: 'og:title', content: 'Content Title for social media' }); */ // Titre pour réseau social
		/*this.metaService.addTag({ name: 'keywords', content: 'TypeScript, Angular' });*/ //Add keyword
		/* this.metaService.addTag({ property: 'og:title', content: "My Text" }) */ // Titre pour l'encadré dans les recherches
	}


	ngOnInit(): void {
		// create api call
		// create the form based on api fields

		this.frmFinish = this.formBuilder.group({
			checkTerms: ['', Validators.requiredTrue],
		});

		this.getCategoryById();

		// Check to know which user is log
		this.currentUser = this.token.getUser();

		let splitToken = this.currentUser.token.split('.')[1]
		let atobRes = JSON.parse(atob(splitToken));
		console.log(atobRes.username);

		// Check if the user is steel log
		this.isLoggedIn = !!this.token.getToken();
		if (this.isLoggedIn) {
			const user = this.token.getUser();

			this.roles = atobRes;
			this.currentUserIdFromToken = atobRes.id;

			console.log(this.roles);
			console.log(this.currentUserIdFromToken);
		}

		this.getCurrentUser();

	}

	submitForm() {

		console.log(this.userForm.value);

		const { name, rate, description, address, category } = this.userForm.value

		console.log(
			name,
			rate,
			description,
			address,
			category,
			this.currentOwnerId
		);

		this.authService.offre(name, rate, description, address, this.currentOwnerId!, category).subscribe({
			next: data => {
				window.alert("Succès ! Votre annonce va être publié d'ici peu.")
				this.isSubmit = true;
				if (this.isSubmit = true) {
					this.router.navigate(['/mon-compte']);
				}
			},
			error: err => {
				this.errorMessage = err.error.message;
				this.isLoginFailed = true;
			}
		});


		this.alert = true;
		this.userForm.reset();
		this.frmFinish.reset();
	}


	//Fonction alert 
	closeAlert() {
		this.alert = false;
	}

	// Reset form after submit
	completeContact(userForm: NgForm) {
		userForm.resetForm()
	}

	getCategoryById() {
		// récupère toute les events dans un tableau
		this.adminService.getAllCategory()
			.subscribe({
				next: categoriesData => {

					//this.categories = categoriesData;
					this.categories = categoriesData["hydra:member"];
					console.log("--->", this.categories)
				},
				error: err => {
					this.content = JSON.parse(err.error).message;
					console.log(this.content);
				}
			});
	}

	getCurrentUser() {
		console.log("================>>>", this.currentUserIdFromToken);
		
		this.adminService.getCurrentUserByOwnerId(this.currentUserIdFromToken!)
			.subscribe({
				next: (data) => {
					let concatOwnerId = "/api/owners/" + data.id;
					console.log(concatOwnerId);
					
					this.currentOwnerId = concatOwnerId;
				},
				error: err => {
					this.content = JSON.parse(err.error).message;
					console.log(this.content);
				}
			});
	}
}
