import { Injectable } from '@angular/core';

export interface Deal {
  deal: string;
  message: string;
}

export interface CoffeePromo {
  videoId: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PromosService {

  constructor() { }

  getBanner(): string {
    return `
    <div style="padding: 18px 32px;">
      <p style="font-size: 24px;">
        Introducing our newest cookie: Choconut! 
        <a style="font-size: 18px; margin-left: 10px; padding: 6px 12px; border-radius: 8px; background-color: #85b0ff; color: white; text-decoration: underline;" href="https://www.google.com" target="_blank">Read more</a>
      </p>
    </div>`
  }

  getDeals(): Deal[] {
    return [{
      deal: 'new',
      message: 'Welcome! Take 40% off: 2SWEET'
    }, {
      deal: 'long-timer',
      message: 'Thanks for your loyalty! Get 25% off: DEALS4U'
    }]
  }

  getCoffeePromos(): CoffeePromo {
    return {
      message: "Our sister store, Coffees 4 U, has the best coffeehouse vibes. Enjoy a cup of joe with a delicious cookie.",
      videoId: '1fueZCTYkpA'
    }
  }
}
