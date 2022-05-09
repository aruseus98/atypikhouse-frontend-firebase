import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AdminService } from '../_services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title = 'Nouvelle catégorie | Atypik House | Location de logement | France';

  userForm: FormGroup;
  isSubmit = false;
  isLoginFailed = false;
  errorMessage = '';
  alert:boolean=false;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private metaService: Meta,
		private titleService: Title,
    private router:Router,
		private tokenStorageService: TokenStorageService) { 
      this.addTag();
      this.titleService.setTitle(this.title);

      this.userForm = this.formBuilder.group({
        category: ['', [Validators.required]],
      });
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

  ngOnInit(): void {
  }

  submitForm(){
    console.log(this.userForm.value);
    const { category } = this.userForm.value
		console.log(category);

		this.adminService.createCategory(category).subscribe({
		  next: data => {
        window.alert("Succès ! Votre catégorie vient d'être créée")
        this.isSubmit = true;
        if (this.isSubmit = true){
          this.router.navigate(['/mon-compte']);
        }
		  },
		  error: err => {
			this.errorMessage = err.error.message;
			this.isLoginFailed = true;
		  }
		});


    this.alert=true;
    this.userForm.reset();
  }

}
