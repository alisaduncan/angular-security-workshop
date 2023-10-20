import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function imageUrlValidator(domain: string): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        const includesDomain = (control.value as string).includes(domain);
        return includesDomain ? null : { imageUrl: {value: control.value}};
    }
}