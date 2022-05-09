import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CGUComponent } from './pages/cgu/cgu.component';
import { CGVComponent } from './pages/cgv/cgv.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';
import { MentionsLegalesComponent } from './pages/mentions-legales/mentions-legales.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { PolitiqueConfidentialiteComponent } from './pages/politique-confidentialite/politique-confidentialite.component';
import { RegisterComponent } from './auth/register/register.component';
import { SuppressionDonneeComponent } from './pages/suppression-donnee/suppression-donnee.component';
import { LodgingDetailComponent } from './pages/lodging-detail/lodging-detail.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { CheckoutStripeSandboxComponent } from './pages/checkout-stripe-sandbox/checkout-stripe-sandbox.component';
import { HebergementComponent } from './pages/hebergement/hebergement.component';
import { LodgingComponent } from './pages/lodging/lodging.component';
import { OffreComponent } from './auth/offre/offre.component';
import { AdminComponent } from './admin/admin.component';
import { LodgingsEditComponent } from './admin/lodgings-edit/lodgings-edit.component';
import { FormsEditLodgingsComponent } from './admin/forms-edit-lodgings/forms-edit-lodgings.component';


const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: '',   redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'contact', component: ContactComponent },
  { path: 'politique-de-confidentialite', component: PolitiqueConfidentialiteComponent},
  { path: 'mentions-legales', component: MentionsLegalesComponent },
  { path: 'conditions-generales-utilisation', component: CGUComponent },
  { path: 'conditions-generales-vente', component: CGVComponent },
  { path: 'suppression-donnees', component: SuppressionDonneeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'lodgings', component: LodgingComponent },
  { path: 'lodging-detail/:id', component: LodgingDetailComponent },
  { path: 'mon-compte', component: UserProfileComponent },
  { path: 'paiement', component: CheckoutStripeSandboxComponent },
  { path: 'hebergement', component: HebergementComponent },
  { path: 'offre', component: OffreComponent },
  { path: 'categorie', component: AdminComponent},
  { path: 'editer-logement', component: LodgingsEditComponent},
  { path: 'editer-annonce/:id', component: FormsEditLodgingsComponent },

  // Re route lien qui n'existe pas sur page 404
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
