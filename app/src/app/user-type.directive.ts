import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[appUserType]'
})
export class UserTypeDirective implements OnChanges {
  private userType!: string;
  private userTypeClaim!: string;
  templateRef = inject(TemplateRef<any>);
  viewContainer = inject(ViewContainerRef);

  @Input() set appUserType(userType: string) {
    this.userType = userType;
  }

  @Input() set appUserTypeClaim(userTypeClaim: string) {
    this.userTypeClaim = userTypeClaim;
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appUserTypeClaim'].previousValue !== changes['appUserTypeClaim'].currentValue ) {
      if (this.userTypeClaim.includes(this.userType)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else { 
        this.viewContainer.clear(); 
      }
    }
  }

}
