import { Component, AfterViewInit, inject, ElementRef, ViewChild } from '@angular/core';
import { PromosService } from '../promos.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  template: `
    <div class="border border-emerald-200 rounded-lg mt-3" #banner></div>
  `,
  styles: []
})
export class BannerComponent implements AfterViewInit {

  @ViewChild('banner') public el!: ElementRef<HTMLElement>;
  private promosService = inject(PromosService);

  ngAfterViewInit(): void {
    const message = this.promosService.getBanner();
    this.el.nativeElement.innerHTML = message;
  }
  
}
