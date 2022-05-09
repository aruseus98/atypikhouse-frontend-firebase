import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-suppression-donnee',
  templateUrl: './suppression-donnee.component.html',
  styleUrls: ['./suppression-donnee.component.scss']
})
export class SuppressionDonneeComponent implements OnInit {

  title ='Suppresion de données | Atypik House | Location de logement | France';

  frmFinish: FormGroup;

  name!: string;
  email: string | undefined;


  constructor(private formBuilder: FormBuilder, private metaService:Meta, private titleService: Title) {
    this.frmFinish = this.formBuilder.group({});
    this.addTag();
    this.titleService.setTitle(this.title);
  }


  addTag() {
    this.metaService.addTag({ charset: 'UTF-8' }); // Set en UTF 8
    this.metaService.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' }); // Donne comme instruction au browser comment controler la dimension et l'échelle de la page
    this.metaService.addTag({ httpEquiv: 'Content-Type', content: 'text/html' }); // Indique aux agents et serveurs de prendre le contenu de cette page en tant que HTML
    this.metaService.addTag({ name: 'description', content: "Suppresion de données d'Atypik House, site de location de logement insolite en France" }); // Meta description de la page
    this.metaService.addTag({ property: 'og-type', content: "Site web"}); // Indique le type de l'objet
    this.metaService.addTag({ name: 'robots', content: 'noindex, nofollow' });  // Permet au robot d'indexer la page
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

  }

  submitForm(){
    const message =`${this.name}
    ${this.email}`;

    //Récupère les valeurs de tous les champs du formulaire
    alert(message);
  }

    // Reset form after submit
    completeContact(contactForm :NgForm){
      contactForm.reset()  
    }

}
