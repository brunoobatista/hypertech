import { FormGroup, FormControl } from "@angular/forms";

export class CpfCnpjValidator {

    static isCpfOrCpnj(formGroup: FormGroup) {
      let value;
      let valid = true;
      for (let key in formGroup.controls) {
        if (formGroup.controls.hasOwnProperty(key)) {
          let control: FormControl = <FormControl>formGroup.controls[key];

          if (value === undefined) {
            value = control.value;
          } else {
            if (value !== control.value) {
              valid = false;
              break;
            }
          }
        }
      }
      if (valid) {
        return null;
      }

      return {
        isCpfOrCpnj: true
      };
    }

  }
