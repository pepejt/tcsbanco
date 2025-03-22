// validators/phone.validator.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function minDateValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  var currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0);
  var date = new Date(value + "T00:00");

  const valid = date >= currentDate;
  return valid ? null : { invalidMinDate: true };
}
