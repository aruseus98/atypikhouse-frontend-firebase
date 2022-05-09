import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-lodging-filter',
	templateUrl: './lodging-filter.component.html',
	styleUrls: ['./lodging-filter.component.scss']
})
export class LodgingFilterComponent implements OnInit {

	filterLodging: FormGroup

	constructor(private formBuilder: FormBuilder) {

		this.filterLodging = this.formBuilder.group(
			{
				destination: ['', [Validators.required]],
				dateDepart: ['', [Validators.required]],
				dateArrivee: ['', [Validators.required]],
				nbAdulte: [0, [Validators.required]],
				nbEnfant: [0, [Validators.required]],
			}
		)
	}

	ngOnInit(): void {
	}

	onSubmit() {
		
		console.log(this.filterLodging.value);

		// this.authService.register(this.filterLodging.value)
		// .subscribe(res => {
			
		// 	if (res.firstName) {
		// 		console.log("gg");
		// 	}
			
		// })
		
		//this.router.navigate(['/']);
	}

}
