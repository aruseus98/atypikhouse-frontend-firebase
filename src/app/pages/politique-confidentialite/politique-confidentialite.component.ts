import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-politique-confidentialite',
  templateUrl: './politique-confidentialite.component.html',
  styleUrls: ['./politique-confidentialite.component.scss']
})
export class PolitiqueConfidentialiteComponent implements OnInit {

  title ='Politique de confidentialité | Atypik House | Location de logement | France';

  constructor(private metaService:Meta, private titleService: Title) {
    //this.visibleImages = this.photoService.getImages()
    this.addTag();
    this.titleService.setTitle(this.title);
  }

  addTag() {
    this.metaService.addTag({ httpEquiv: 'Content-Type', content: 'text/html' }); // Indique aux agents et serveurs de prendre le contenu de cette page en tant que HTML
    this.metaService.addTag({ name: 'description', content: "Politique de confidentialité d'Atypik House, site de location de logement insolite en France" }); // Meta description de la page
    this.metaService.addTag({ property: 'og-type', content: "Site web"}); // Indique le type de l'objet
    this.metaService.addTag({ name: 'robots', content: 'noindex, nofollow' });  // Permet au robot d'indexer la page
    /* this.metaService.addTag({ property: 'og:title', content: 'Content Title for social media' }); */ // Titre pour réseau social
    /*this.metaService.addTag({ name: 'keywords', content: 'TypeScript, Angular' });*/ //Add keyword
    /* this.metaService.addTag({ property: 'og:title', content: "My Text" }) */ // Titre pour l'encadré dans les recherches
  }

  ngOnInit(): void {
  }

}
