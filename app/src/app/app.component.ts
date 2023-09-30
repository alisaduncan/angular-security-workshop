import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="flex flex-col min-h-screen justify-center">
    <app-header></app-header>

    <main class="flex-grow">
      <router-outlet></router-outlet>
    </main>
  
    <app-footer></app-footer>
  </div>
  `,
})
export class AppComponent {
  title = 'app';
}
