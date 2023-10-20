import { Component, AfterViewInit, inject, ElementRef, ViewChild, SecurityContext } from '@angular/core';
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
  private sanitizer = inject(DomSanitizer);

  @ViewChild('banner') public el!: ElementRef<HTMLElement>;
  private promosService = inject(PromosService);

  ngAfterViewInit(): void {
    const message = this.promosService.getBanner();
    const sanitized = this.sanitizer.sanitize(SecurityContext.HTML, message);
    this.el.nativeElement.innerHTML = sanitized ?? '';
  }
  
}
