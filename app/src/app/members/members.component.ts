import { Component } from '@angular/core';

@Component({
  selector: 'app-members',
  template: `
    <h2 class="text-center text-4xl text-cyan-500">Cookie Jar</h2>
    <p class="text-center text-lg my-6">Membership has its rewards. Check out our selection of cookies for members</p>
    <div class="flex">
      <div class="flex mx-6" *ngFor="let cookie of cookies">
        <img [src]="cookie.imageUrl" alt="{{cookie.name}}" class="max-h-96 max-w-96 rounded-lg" />
        <div class="ml-6 mt-6">
          <p class="text-xl text-violet-600">{{cookie.name}}</p>
          <p class="my-3 text-md text-slate-600 flex-grow">{{cookie.description}}</p>
        </div>
      </div>
    </div>
  `
})
export class MembersComponent {
  cookies = [{
    name: 'Cookie Inception',
    description: 'A cookie inside a cookie. Whoa!',
    imageUrl: 'https://images.unsplash.com/photo-1609501886186-d4de01248beb?auto=format&fit=crop&w=1936&q=80'
  },{
    name: 'Gingersnap Biscotti',
    description: 'Molasses and ginger in a biscotti. Perfect for dunking in coffee.',
    imageUrl: 'https://images.unsplash.com/photo-1608070734668-e74dc3dda037?auto=format&fit=crop&w=1974&q=80'
  }]
}
