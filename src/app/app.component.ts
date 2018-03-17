import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  elements: Elements;
  card: StripeElement;
  public result;
  @ViewChild('card') cardRef: ElementRef;

  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: 'es'
  };

  stripeTest: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService) {}

    ngOnInit() {
      this.stripeTest = this.fb.group({
        name: ['', [Validators.required]]
      });
      this.stripeService.elements(this.elementsOptions)
        .subscribe(elements => {
          this.elements = elements;
          // Only mount the element the first time
          if (!this.card) {
            this.card = this.elements.create('card', {
              style: {
                base: {
                  iconColor: '#666EE8',
                  color: '#31325F',
                  lineHeight: '40px',
                  fontWeight: 300,
                  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                  fontSize: '18px',
                  '::placeholder': {
                    color: '#CFD7E0'
                  }
                }
              }
            });
            this.card.mount(this.cardRef.nativeElement);
          }
        });
    }

    buy() {
      const name = this.stripeTest.get('name').value;
      this.stripeService
        .createToken(this.card, { name })
        .subscribe(token => {
          if (token) {
            console.log(token);
          } else if (token.error) {
            console.log(token.error.message);
          }
        });
    }
}
