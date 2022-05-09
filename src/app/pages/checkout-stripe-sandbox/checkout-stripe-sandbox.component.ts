import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout-stripe-sandbox',
  templateUrl: './checkout-stripe-sandbox.component.html',
  styleUrls: ['./checkout-stripe-sandbox.component.scss']
})
export class CheckoutStripeSandboxComponent implements OnInit {

  title ='Paiement | Atypik House | Location de logement | France';

  paymentHandler:any = null;

  constructor(private metaService:Meta, private titleService: Title) { 
    this.addTag();
    this.titleService.setTitle(this.title);
  }


  addTag() {
    /*this.metaService.addTag({ charset: 'UTF-8' }); // Set en UTF 8
    this.metaService.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' }); */ // Donne comme instruction au browser comment controler la dimension et l'échelle de la page
    this.metaService.addTag({ httpEquiv: 'Content-Type', content: 'text/html' }); // Indique aux agents et serveurs de prendre le contenu de cette page en tant que HTML
    this.metaService.addTag({ name: 'description', content: "Page de paiement du site de location de logement insolite en France" }); // Meta description de la page
    this.metaService.addTag({ property: 'og-type', content: "Site web"}); // Indique le type de l'objet
    this.metaService.addTag({ name: 'robots', content: 'noindex, nofollow' });  // Permet au robot d'indexer la page
    /* this.metaService.addTag({ property: 'og:title', content: 'Content Title for social media' }); */ // Titre pour réseau social
    /*this.metaService.addTag({ name: 'keywords', content: 'TypeScript, Angular' });*/ //Add keyword
    /* this.metaService.addTag({ property: 'og:title', content: "My Text" }) */ // Titre pour l'encadré dans les recherches
  }


  ngOnInit() {
    this.invokeStripe();
  }
  
  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KvR5nHJOjSYgElUAXPWZaqt6uj9FPtroWlOpF0g1dLe51q3opn7gW2FqvOZtBAqEecz7u7by2rLtV8VwH1cwbOT00tgHnGhSS',
      locale: 'fr',
      token: function (stripeToken: any) {
        console.log({stripeToken})
        alert('Stripe token generated!');
      }
    });
  
    paymentHandler.open({
      name: 'Paiement',
      description: 'Réservation de Châlet Albert',
      amount: amount * 100
    });
  }
  
  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KvR5nHJOjSYgElUAXPWZaqt6uj9FPtroWlOpF0g1dLe51q3opn7gW2FqvOZtBAqEecz7u7by2rLtV8VwH1cwbOT00tgHnGhSS',
          locale: 'fr',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Le paiement a été effectué avec succès');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }

}
