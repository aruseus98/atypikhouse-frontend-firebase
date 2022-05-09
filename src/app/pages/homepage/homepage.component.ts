import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  encapsulation: ViewEncapsulation.None, //Disable encapsulation carousel and change the css 
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [ NgbCarouselConfig ]
})
export class HomepageComponent implements OnInit {
  title ='Accueil | Atypik House | Location de logement | France';
  //showNavigationArrows = true;
  //showNavigationIndicators = false;
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  //images = ['atypik-house-accueil-1', 'atypik-house-accueil-2', 'atypik-house-accueil-3'].map((n) => `../../assets/images/icons/${n}.jpg`);

  constructor(config: NgbCarouselConfig, private metaService:Meta, private titleService: Title) { 
    //config.interval = 5000; // Change de slide toutes les 5 secondes
    //config.wrap = true;
    //config.showNavigationArrows = true; // Affiche les flèches
    //config.showNavigationIndicators = false;
    //config.pauseOnFocus = false;
    //config.pauseOnHover = false;
    this.addTag();
    this.titleService.setTitle(this.title);
  }

  // Définition des différentes balises pour le SEO
  addTag() {
    this.metaService.addTag({ httpEquiv: 'Content-Type', content: 'text/html' }); // Indique aux agents et serveurs de prendre le contenu de cette page en tant que HTML
    this.metaService.addTag({ name: 'description', content: 'Atypik House, site de location de logement insolite en France' }); // Meta description de la page
    this.metaService.addTag({ property: 'og-type', content: "Site web"}); /* Indique le type de l'objet
    /*this.metaService.addTag({ name: 'robots', content: 'index,follow' }); */ // Permet au robot d'indexer la page
    /* this.metaService.addTag({ property: 'og:title', content: 'Content Title for social media' }); */ // Titre pour réseau social
    this.metaService.addTag({ name: 'keywords', content: 'Logement insolite, hébergement, logement nature' }); //Add keyword
    /* this.metaService.addTag({ property: 'og:title', content: "My Text" }) */ // Titre pour l'encadré dans les recherches
  }

  ngOnInit(): void {
  }

}
