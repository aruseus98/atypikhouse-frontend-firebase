import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Lodgings } from 'src/app/shared/models/lodgings.model';
import { PublicService } from 'src/app/_services/public.service';

@Component({
	selector: 'app-lodging',
	templateUrl: './lodging.component.html',
	styleUrls: ['./lodging.component.scss']
})
export class LodgingComponent implements OnInit {

	content: any;
	lodgings: Lodgings[] = []
	// selectedId: any;
	//heroes = HEROES;

	constructor(
		private publicService: PublicService,
		private routeActive: ActivatedRoute,
		private route: Router) { }

	ngOnInit(): void {

		this.getAllLodgings();

		// this.lodgings = this.routeActive.paramMap.pipe(
		// 	switchMap(params => {
		// 		this.selectedId = params.get('id');
		// 		return this.publicService.getLodgings();
		// 	})
		// );
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

	goToProductDetails(id: number) {
		this.route.navigate(['/lodging-detail', id]);
	}

}
