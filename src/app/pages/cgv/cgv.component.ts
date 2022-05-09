import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cgv',
  templateUrl: './cgv.component.html',
  styleUrls: ['./cgv.component.scss']
})
export class CGVComponent implements OnInit {

  title ='Conditions générales de vente | Atypik House | Location de logement | France';


  constructor(private metaService:Meta, private titleService: Title) { 
    this.addTag();
    this.titleService.setTitle(this.title);
  }


    // Définition des différentes balises pour le SEO
    addTag() {
      this.metaService.addTag({ httpEquiv: 'Content-Type', content: 'text/html' }); // Indique aux agents et serveurs de prendre le contenu de cette page en tant que HTML
      this.metaService.addTag({ name: 'description', content: "Conditions générales de vente d'Atypik House, site de location de logement insolite en France" }); // Meta description de la page
      this.metaService.addTag({ property: 'og-type', content: "Site web"}); // Indique le type de l'objet
      this.metaService.addTag({ name: 'robots', content: 'noindex, nofollow' });  // Permet au robot d'indexer la page
      /* this.metaService.addTag({ property: 'og:title', content: 'Content Title for social media' }); */ // Titre pour réseau social
      /*this.metaService.addTag({ name: 'keywords', content: 'TypeScript, Angular' });*/ //Add keyword
      /* this.metaService.addTag({ property: 'og:title', content: "My Text" }) */ // Titre pour l'encadré dans les recherches
    }

  ngOnInit(): void {
  }

}
