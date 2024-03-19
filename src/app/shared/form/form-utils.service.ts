import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  validateAllFormsFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls)
      .forEach(field => {
        const control = formGroup.get(field);

        if(control instanceof UntypedFormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if(
          control instanceof UntypedFormGroup ||
          control instanceof UntypedFormArray
        ) {
          control.markAsTouched({ onlySelf: true });
          this.validateAllFormsFields(control);
        }
      });
  }

  getErrorMessage(
    formGroup: UntypedFormGroup,
    fieldName: string
  ) {
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(
    field: UntypedFormControl
  ) {

    if(field?.hasError('required')) {
      return 'Field can not be empty.'
    }

    if(field?.hasError('minlength')) {
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 2;
      console.log(requiredLength);
      return `Field need have minimun ${requiredLength} characteres.`;
    }

    if(field?.hasError('maxlength')) {
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 50;
      return `Field can have maximum ${requiredLength} characteres.`;
    }

    return 'Invalid input.'
  }

  getErrorMensagemFormArray(
    formGroup: UntypedFormGroup,
    formArrayName: string,
    fieldName: string,
    index: number
  ) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field)
  }

  isFormArrayRequiredValid(
    formGroup: UntypedFormGroup,
    formArrayName: string
  ) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return !formArray.valid && formArray.hasError('required') && formArray.touched;
  }

}
