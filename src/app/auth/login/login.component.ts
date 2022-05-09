import { Component, OnInit, ElementRef } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgForm } from '@angular/forms';

import { Meta, Title } from '@angular/platform-browser';
import { ReCaptchaV3Service } from 'ng-recaptcha';

//HTTP INTERCEPTOR
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	title = 'Connexion | Atypik House | Location de logement | France';

	isLoggedIn = false;
	isLoginFailed = false;
	errorMessage = '';
	roles: string[] = [];

	userForm: FormGroup;
	identifiant!: string;
	password!: string;
	public inputPassword = this.el.nativeElement;
	public imgPassword = this.el.nativeElement;

	private _shown = false;

	constructor(
		private formBuilder: FormBuilder, private el: ElementRef,
		private metaService: Meta, private titleService: Title,
		private recaptchaV3Service: ReCaptchaV3Service,
		private authService: AuthService,
		private tokenStorage: TokenStorageService,
		private router:Router) {
		this.addTag();
		this.titleService.setTitle(this.title);

		this.userForm = this.formBuilder.group(
			{
				email: ['', [Validators.required]],
				password: ['', [Validators.required]]
			}
		)
	}

	//Génération du token
	public login(form: NgForm): void {
		this.recaptchaV3Service.execute('importantAction')
			.subscribe((token) => this.handleToken(token));
	}
	handleToken(token: string): void {
		this.recaptchaV3Service.execute('importantAction')
			.subscribe((token: string) => {
				console.log(`[${token}]`);
			});
	}

	addTag() {
		this.metaService.addTag({ httpEquiv: 'Content-Type', content: 'text/html' }); // Indique aux agents et serveurs de prendre le contenu de cette page en tant que HTML
		this.metaService.addTag({ name: 'description', content: "Connectez vous sur Atypik House, site de location de logement insolite en France" }); // Meta description de la page
		this.metaService.addTag({ property: 'og-type', content: "Site web" }); /* Indique le type de l'objet
    /*this.metaService.addTag({ name: 'robots', content: 'index,follow' }); */ // Permet au robot d'indexer la page
		/* this.metaService.addTag({ property: 'og:title', content: 'Content Title for social media' }); */ // Titre pour réseau social
		/*this.metaService.addTag({ name: 'keywords', content: 'TypeScript, Angular' });*/ //Add keyword
		/* this.metaService.addTag({ property: 'og:title', content: "My Text" }) */ // Titre pour l'encadré dans les recherches
	}


	ngOnInit(): void {
	}


	onSubmit() {
		const { email, password } = this.userForm.value
		console.log(email, password);

		this.authService.login(email, password).subscribe({
		  next: data => {
			console.log("gg --------->");
			console.log(data.token);
			this.tokenStorage.saveToken(data.token);
			this.tokenStorage.saveUser(data);
			this.isLoginFailed = false;
			this.isLoggedIn = true;
			/*this.roles = this.tokenStorage.getUser().roles;*/
			//this.reloadPage();
			if(this.isLoggedIn = true){
				this.router.navigate(['/mon-compte']);
			}
		  },
		  error: err => {
			this.errorMessage = err.error.message;
			this.isLoginFailed = true;
		  }
		});
	  }

	reloadPage(): void {
		window.location.reload();
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
}


