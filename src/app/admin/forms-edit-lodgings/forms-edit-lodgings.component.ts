import { Component, OnInit, OnChanges } from '@angular/core';
import { PhotoServiceService } from 'src/app/shared/services/photo-service.service';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Lodgings } from 'src/app/shared/models/lodgings.model';
import { PublicService } from 'src/app/_services/public.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/_services/admin.service';
import { Category } from 'src/app/shared/models/category.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
    selector: 'app-forms-edit-lodgings',
    templateUrl: './forms-edit-lodgings.component.html',
    styleUrls: ['./forms-edit-lodgings.component.scss']
})
export class FormsEditLodgingsComponent implements OnInit {

    title = 'Editer | Atypik House | Location de logement | France';
    lodging!: Lodgings;
    images!: any[];
    content: any;
    id?: number;
    lodgingId?: number;
    userForm: FormGroup;
    isSubmit = false;
    currentOwnerId?: string;
    currentUserIdFromToken?: number;
    isLoggedIn = false;
    currentUser: any;
	roles: string[] = [];
    
    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 3
        }
    ];
    categories: Category[] = [];;

    constructor(
        private route: ActivatedRoute, private router: Router,
        private adminService: AdminService,
        private publicService: PublicService, private photoService: PhotoServiceService,
        private metaService: Meta, private titleService: Title,
        private formBuilder: FormBuilder,
        private token: TokenStorageService,) {

        this.addTag();
        this.titleService.setTitle(this.title);

        this.userForm = this.formBuilder.group(
            {
                name: ['', [Validators.required]],
                address: ['', [Validators.required]],
                category: ['', [Validators.required]],
                rate: ['', [Validators.required]],
                // owner: ['', [Validators.required]],
                description: ['', [Validators.required]]
            }
        );

        // Check to know which user is log
		this.currentUser = this.token.getUser();

		let splitToken = this.currentUser.token.split('.')[1]
		let atobRes = JSON.parse(atob(splitToken));

        // Check if the user is steel log
		this.isLoggedIn = !!this.token.getToken();
		if (this.isLoggedIn) {
			const user = this.token.getUser();

			this.roles = atobRes;
			this.currentUserIdFromToken = atobRes.id;

			console.log(this.roles);
			console.log(this.currentUserIdFromToken);
			// this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
			// /*console.log(this.showAdminBoard)*/
			// this.showOwnerBoard = this.roles.includes('ROLE_OWNER');
		}
    }

    addTag() {
        this.metaService.addTag({ httpEquiv: 'Content-Type', content: 'text/html' }); // Indique aux agents et serveurs de prendre le contenu de cette page en tant que HTML
        this.metaService.addTag({ name: 'description', content: "Conditions générales d'utilisation d'Atypik House, site de location de logement insolite en France" }); // Meta description de la page
        this.metaService.addTag({ property: 'og-type', content: "Site web" }); /* Indique le type de l'objet
        /*this.metaService.addTag({ name: 'robots', content: 'index,follow' }); */ // Permet au robot d'indexer la page
        /* this.metaService.addTag({ property: 'og:title', content: 'Content Title for social media' }); */ // Titre pour réseau social
        /*this.metaService.addTag({ name: 'keywords', content: 'TypeScript, Angular' });*/ //Add keyword
        /* this.metaService.addTag({ property: 'og:title', content: "My Text" }) */ // Titre pour l'encadré dans les recherches
    }


    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
            console.log();

            // In a real app: dispatch action to load the details here.
        });

        console.log("=====>", this.id);

        this.getLodging();
        this.getCategoryById();
    }

    getCategoryById() {
        // récupère toute les events dans un tableau
        this.adminService.getAllCategory()
            .subscribe({
                next: categoriesData => {

                    //this.categories = categoriesData;
                    this.categories = categoriesData["hydra:member"];
                    console.log("--->", this.categories)
                },
                error: err => {
                    this.content = JSON.parse(err.error).message;
                    console.log(this.content);
                }
            });
    }

    getLodging() {
        // récupère toute les events dans un tableau
        this.publicService.getLodgingId(this.id!)
            .subscribe({
                next: lodginsData => {

                    //this.lodging = lodginsData;

                    this.userForm = this.formBuilder.group(
                        {
                            name: lodginsData.name,
                            address: lodginsData.address,
                            category: lodginsData.category,
                            rate: lodginsData.rate,
                            owner: lodginsData.owner,
                            description: lodginsData.description
                        }
                    );

                    this.lodgingId = lodginsData.id;

                    console.log(">>>>>>>>>>", this.lodgingId);
                },
                error: err => {
                    this.content = JSON.parse(err.error).message;
                    console.log(this.content);
                }
            });
    }

    getCurrentUser() {
		console.log("================>>>", this.currentUserIdFromToken);
		
		this.adminService.getCurrentUserByOwnerId(this.currentUserIdFromToken!)
			.subscribe({
				next: (data) => {
					let concatOwnerId = "/api/owners/" + data.id;
					console.log(concatOwnerId);
					
					this.currentOwnerId = concatOwnerId;
				},
				error: err => {
					this.content = JSON.parse(err.error).message;
					console.log(this.content);
				}
			});
	}

    submitForm() {
        console.log("========>>>>=======>>>", this.userForm.value);

        const { name,
            rate,
            description,
            address,
            category } = this.userForm.value

        
        //Requête éditer une annonce
        this.adminService.editLodgings(this.lodgingId!, name,
            rate,
            description,
            address,
            this.currentOwnerId!,
            category)
            .subscribe({
                next: data => {
                    window.alert("Succès ! Votre annonce va être publié d'ici peu.")
                    this.isSubmit = true;
                    if (this.isSubmit = true) {
                        this.router.navigate(['/editer-logement']);
                    }
                },
                error: err => {
                    this.content = JSON.parse(err.error).message;
                    console.log(this.content);
                }
            });

    }

    btnPrec(){
        this.router.navigate(['/mon-compte']);
    }




}
