import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AdminService } from 'src/app/_services/admin.service';
import { User } from 'src/app/shared/models/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

	title = 'Mon compte | Atypik House | Location de logement | France';
	currentUser: any;
	userObject: any;
	isSuccessful = false;
	isUpdatedFailed = false;
	errorMessage = '';
	userInfo?: User;

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

	private roles: string[] = [];
	isLoggedIn = false;
	showAdminBoard = false;
	showOwnerBoard = false;
	showUserBoard = false;
	content?: string;
	//username?: string;

	constructor(
		private el: ElementRef,
		private formBuilder: FormBuilder,
		private metaService: Meta,
		private titleService: Title,
		private token: TokenStorageService,
		private tokenStorageService: TokenStorageService,
		private adminService: AdminService,
		private userService: UserService) {

			this.userForm = this.formBuilder.group(
				{
					lastName: [this.userInfo?.lastName, [Validators.required]],
					firstName: [this.userInfo?.firstName, [Validators.required]],
					email: [this.userInfo?.email, [Validators.required]],
					password: ['', [Validators.required]]
				}
			)
		this.addTag(); //SEO
		this.titleService.setTitle(this.title);

		this.frmFinish = this.formBuilder.group({});
	}

	addTag() {
		/*this.metaService.addTag({ charset: 'UTF-8' }); // Set en UTF 8
		this.metaService.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' }); */ // Donne comme instruction au browser comment controler la dimension et l'échelle de la page
		this.metaService.addTag({ httpEquiv: 'Content-Type', content: 'text/html' }); // Indique aux agents et serveurs de prendre le contenu de cette page en tant que HTML
		this.metaService.addTag({ name: 'description', content: "Mon compte sur Atypik House, site de location de logement insolite en France" }); // Meta description de la page
		this.metaService.addTag({ property: 'og-type', content: "Site web" }); // Indique le type de l'objet
		this.metaService.addTag({ name: 'robots', content: 'noindex, nofollow' });  // Permet au robot d'indexer la page
		/* this.metaService.addTag({ property: 'og:title', content: 'Content Title for social media' }); */ // Titre pour réseau social
		/*this.metaService.addTag({ name: 'keywords', content: 'TypeScript, Angular' });*/ //Add keyword
		/* this.metaService.addTag({ property: 'og:title', content: "My Text" }) */ // Titre pour l'encadré dans les recherches
	}

	getUserInfo() {
		this.userService.getAllUsers().subscribe(data => {
			// console.log(data['hydra:member']);
			data['hydra:member'].map((user: any[]) => {
				var indiv =JSON.parse(JSON.stringify(user));
				if(indiv.id === this.userObject.id){
					this.userInfo = indiv;
				}
			});
			console.log(this.userInfo);
			this.userForm = this.formBuilder.group(
				{
					lastName: this.userInfo?.lastName,
					firstName: this.userInfo?.firstName,
					email: this.userInfo?.email,
					password: this.userInfo?.password
				}
			)
		},
			err => {
				this.errorMessage = err.error.message;
				this.isUpdatedFailed = true;
			}
		);
	}

	ngOnInit(): void { //on page load
		this.currentUser = this.token.getUser();
		// console.log(this.currentUser);
		// console.log('-----------------------')

		let splitToken = this.currentUser.token.split('.')[1]
		let atobRes = JSON.parse(atob(splitToken));
		console.log(atobRes)
		this.userObject = atobRes;

		this.getUserInfo();
		console.log('/--------/');
		console.log(this.userInfo);

		// Check if the user is steel log
		this.isLoggedIn = !!this.token.getToken();
		if (this.isLoggedIn) {
		  const user = this.tokenStorageService.getUser();
		  
		  this.roles = atobRes.roles;
		  console.log(this.roles)
		  this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
		  /*console.log(this.showAdminBoard)*/
		  this.showOwnerBoard = this.roles.includes('ROLE_OWNER');
		  // TODO implement showUserBoard
		  this.showUserBoard = this.roles.length === 1 && this.roles[0] === 'ROLE_USER';
		}

		this.adminService.getallUsers().subscribe({
			next: data => {
				this.content = data;
				console.log(data.roles)
			},
			error: err => {
			  //this.errorMessage = err.error.message;
			  //this.isLoginFailed = true;
			}
		  });

	}

	//Redirection sur page inscription success
	onSubmit() {
		const { email, password, firstName, lastName } = this.userForm.value
		this.userService.patchUserInfo(this.userObject.id, email, password, firstName, lastName)
			.subscribe(data => {

				if (data.firstName) {

					console.log("gg --------->");
					console.log(data);
					this.isSuccessful = true;
					this.isUpdatedFailed = false;
					window.alert("Succès ! Vos informations ont bien été mis à jour!")
				}
			},
				err => {
					this.errorMessage = err.error.message;
					this.isUpdatedFailed = true;
				}
			);

		//this.router.navigate(['/']);
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

	reloadPage(): void {
		window.location.reload();
	}

}
