import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
	selector: 'app-main-footer',
	templateUrl: './main-footer.component.html',
	styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent implements OnInit {


	constructor() { }

	ngOnInit(): void {
		//this.getCurrentLocation();

	}

	/*loading = false;

	@ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
	@ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

	mapZoom = 16;
	mapCenter!: google.maps.LatLng;
	mapOptions: google.maps.MapOptions = {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoomControl: true,
		scrollwheel: false,
		disableDoubleClickZoom: true,
		maxZoom: 20,
		minZoom: 4,
	};

	markerInfoContent = '';
	markerOptions: google.maps.MarkerOptions = {
		draggable: false,
		animation: google.maps.Animation.DROP,
	};

	openInfoWindow(marker: MapMarker) {
		// this is called when the marker is clicked.
		this.infoWindow.open(marker);
	}

	getCurrentLocation() {
		this.loading = true;

		navigator.geolocation.getCurrentPosition(
			(position: GeolocationPosition) => {
				this.loading = false;

				const point: google.maps.LatLngLiteral = {

					lat: 49.34571226002929,
					lng: 2.9629632711283724,
				};

				this.mapCenter = new google.maps.LatLng(point);
				this.map.panTo(point);

				this.markerInfoContent = "I'm here!";

				this.markerOptions = {
					draggable: false,
					animation: google.maps.Animation.DROP,
				};
			},
			(error) => {
				this.loading = false;

				if (error.PERMISSION_DENIED) {
					//this.toastr.error("Couldn't get your location", 'Permission denied');
				} else if (error.POSITION_UNAVAILABLE) {
					// this.toastr.error(
					//   "Couldn't get your location",
					//   'Position unavailable'
					// );
				} else if (error.TIMEOUT) {
					//this.toastr.error("Couldn't get your location", 'Timed out');
				} else {
					//this.toastr.error(error.message, `Error: ${error.code}`);
				}
			},
			{ enableHighAccuracy: true }
		);
	}*/

	// Initialize and add the map
	// public initMap(): void {
	// 	// The location of Uluru
	// 	const uluru = { lat: -25.344, lng: 131.031 };
	// 	// The map, centered at Uluru
	// 	const map = new google.maps.Map(
	// 		document.getElementById("map") as HTMLElement,
	// 		{
	// 			zoom: 4,
	// 			center: uluru,
	// 		}
	// 	);

	// 	// The marker, positioned at Uluru
	// 	const marker = new google.maps.Marker({
	// 		position: uluru,
	// 		map: map,
	// 	});
	// }

}
