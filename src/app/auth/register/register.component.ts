import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	title = 'Inscription | Atypik House | Location de logement | France';
	isSuccessful = false;
	isSignUpFailed = false;
	errorMessage = '';

	//Initialisation des variables associé au register form pour pouvoir contrôler les champs associés
	userForm: FormGroup;
	frmFinish: FormGroup;
	repassword = this.formBuilder.group({
		samePassword: ['', [Validators.required]],
	})

	public inputPassword = this.el.nativeElement;
	public inputRePassword = this.el.nativeElement;
	public imgPassword = this.el.nativeElement;

	private _shown = false;

	Roles: any = ['Propriétaire/Locataire', 'Propriétaire', 'Locataire'];
	constructor(private formBuilder: FormBuilder, private router: Router,
		private el: ElementRef, private authService: AuthService, private metaService: Meta, private titleService: Title) {

		this.userForm = this.formBuilder.group(
			{
				lastName: ['', [Validators.required]],
				firstName: ['', [Validators.required]],
				email: ['', [Validators.required]],
				password: ['', [Validators.required]],
				photoUrl: ['']
			}
		)

		this.addTag();
		this.titleService.setTitle(this.title);

		this.frmFinish = this.formBuilder.group({});

	}

	addTag() {
		this.metaService.addTag({ httpEquiv: 'Content-Type', content: 'text/html' }); // Indique aux agents et serveurs de prendre le contenu de cette page en tant que HTML
		this.metaService.addTag({ name: 'description', content: "Inscrivez-vous sur Atypik House, site de location de logement insolite en France" }); // Meta description de la page
		this.metaService.addTag({ property: 'og-type', content: "Site web" }); /* Indique le type de l'objet
		/*this.metaService.addTag({ name: 'robots', content: 'index,follow' }); */ // Permet au robot d'indexer la page
		/* this.metaService.addTag({ property: 'og:title', content: 'Content Title for social media' }); */ // Titre pour réseau social
		/*this.metaService.addTag({ name: 'keywords', content: 'TypeScript, Angular' });*/ //Add keyword
		/* this.metaService.addTag({ property: 'og:title', content: "My Text" }) */ // Titre pour l'encadré dans les recherches
	}

	ngOnInit() {
		this.frmFinish = this.formBuilder.group({
			checkTerms: ['', Validators.requiredTrue],
		});
	}

	//Redirection sur page inscription success
	onSubmit() {
		const { email, password, firstName, lastName, photo } = this.userForm.value
		console.log(email, password, firstName, lastName, photo);

		this.authService.register(email, password, firstName, lastName, photo)
			.subscribe(data => {

				if (data.firstName) {

					console.log("gg --------->");
					console.log(data);
					this.isSuccessful = true;
					this.isSignUpFailed = false;
				}
			},
				err => {
					this.errorMessage = err.error.message;
					this.isSignUpFailed = true;
				}
			);
		window.alert("Compte créé avec succès !")
		this.router.navigate(['/']);
	}

	visibilityPassword() {

		const myInputPassword = this.inputPassword.querySelector("input[name='password']");
		const myImgPassword = this.imgPassword.querySelector("img.imgVisibility1");
		this._shown = !this._shown;

		if (this._shown) {

			myInputPassword.setAttribute('type', 'test');
			myImgPassword.src = "../../assets/icons/passwordVisibility/visibility_off.svg";

		} else {

			myInputPassword.setAttribute('type', 'password');
			myImgPassword.src = "../../assets/icons/passwordVisibility/visibility.svg";
		}

	}

	visibilityConfirmPassword() {

		const myInputRePassword = this.inputRePassword.querySelector("input[name='repassword']");
		const myImgPassword = this.imgPassword.querySelector("img.imgVisibility2");
		this._shown = !this._shown;

		if (this._shown) {

			myInputRePassword.setAttribute('type', 'test');
			myImgPassword.src = "../../assets/icons/passwordVisibility/visibility_off.svg";

		} else {

			myInputRePassword.setAttribute('type', 'password');
			myImgPassword.src = "../../assets/icons/passwordVisibility/visibility.svg";
		}

	}

}