import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Lodgings } from 'src/app/shared/models/lodgings.model';
import { PublicService } from 'src/app/_services/public.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
	selector: 'app-lodgings-edit',
	templateUrl: './lodgings-edit.component.html',
	styleUrls: ['./lodgings-edit.component.scss']
})
export class LodgingsEditComponent implements OnInit {

	title = 'Editer logement | Atypik House | Location de logement | France';

	content: any;
	lodgings: Lodgings[] = []
	selectedId: any;
	//heroes = HEROES;

	constructor(
		private publicService: PublicService,
		private routeActive: ActivatedRoute,
		private route: Router,
		private metaService: Meta,
		private titleService: Title) {
		this.addTag();
		this.titleService.setTitle(this.title);
	}

	addTag() {
		/*this.metaService.addTag({ charset: 'UTF-8' }); // Set en UTF 8
		this.metaService.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' }); */ // Donne comme instruction au browser comment controler la dimension et l'échelle de la page
		this.metaService.addTag({ httpEquiv: 'Content-Type', content: 'text/html' }); // Indique aux agents et serveurs de prendre le contenu de cette page en tant que HTML
		this.metaService.addTag({ name: 'description', content: "Editer logement sur Atypik House, site de location de logement insolite en France" }); // Meta description de la page
		this.metaService.addTag({ property: 'og-type', content: "Site web" }); // Indique le type de l'objet
		this.metaService.addTag({ name: 'robots', content: 'noindex, nofollow' });  // Permet au robot d'indexer la page
		/* this.metaService.addTag({ property: 'og:title', content: 'Content Title for social media' }); */ // Titre pour réseau social
		/*this.metaService.addTag({ name: 'keywords', content: 'TypeScript, Angular' });*/ //Add keyword
		/* this.metaService.addTag({ property: 'og:title', content: "My Text" }) */ // Titre pour l'encadré dans les recherches
	}


	ngOnInit(): void {
		this.getAllLodgings();
	}



	getAllLodgings() {
		// récupère toute les events dans un tableau
		this.publicService.getLodgings()
			.subscribe({
				next: lodginsData => {

					//this.lodgings = lodginsData;
					this.lodgings = lodginsData["hydra:member"];
					console.log("--->", this.lodgings)
				},
				error: err => {
					this.content = JSON.parse(err.error).message;
					console.log(this.content);
				}
			});
	}

	goToProductEdit(id: number) {
		this.route.navigate(['/editer-annonce', id]);
	}

}
