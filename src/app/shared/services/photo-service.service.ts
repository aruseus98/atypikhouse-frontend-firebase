import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Images } from 'src/app/shared/models/images.model'

@Injectable({
	providedIn: 'root'
})
export class PhotoServiceService {

	constructor(private http: HttpClient) { }

	visibleImages:any = [];

	getImages() {
		return this.http.get<any>('assets/data/photos.json')
      .toPromise()
      .then(res => <Images[]>res.data)
      .then(data => { return data; });
	}

	// getImage(id: number) {
	// 	return IMAGES.slice(0).find(image => image.id == id)
	// }
}

