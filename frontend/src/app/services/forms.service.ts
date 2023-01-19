import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FormsService {


  public gestionarValidarErrors(form, marcarDirty?) {
    Object.keys(form.value).forEach(key => {
      setTimeout(() => {
        if (marcarDirty) {
          form.controls[key]?.markAsDirty()
        }
        this.gestioValidarCamps(key, form);
      })
      if (key && !marcarDirty) {
        form.get(key)?.valueChanges.subscribe((value, key1) => {
          setTimeout(() => {
            this.gestioValidarCamps(key, form);
          })
        });
      }
    })
  }

  
  public gestioValidarCamps(key1, form) {
    let divTag = document.getElementById(key1)?.parentElement;
    let inputTag = document.getElementById(key1) as HTMLInputElement | null;
    let oldSpan = document.getElementById(`error-campo-mensaje-${key1}`);
    let warningMsg = document.getElementById(`warning-campo-mensaje-${key1}`);

    // Missatge a inserir
    let spanTag = document.createElement('span');
    spanTag.classList.add('error-campo-mensaje');
    spanTag.setAttribute('id', `error-campo-mensaje-${key1}`);

    let warningTag = document.createElement('span');
    warningTag.setAttribute('id', `warning-campo-mensaje-${key1}`);
    warningTag.classList.add('aviso-campo');

    // Reset span i msg
    oldSpan?.remove();
    warningMsg?.remove();

    if (inputTag?.nodeName !== 'TABLE' && inputTag?.nodeName !== 'DIV') {
      if (form.controls[key1]?.errors) {
        this.gestioErrors(spanTag, key1, inputTag, form, divTag);
      } else {
        this.gestioValid(spanTag, inputTag, warningTag, divTag, key1, form)

      }
    }
  }

  public gestioErrors(spanTag, key1, inputTag, form, divTag) {

    spanTag.innerHTML = this.ordenarErrors(Object.keys(form.controls[key1].errors));
    if (form.controls[key1]?.dirty) {
      divTag?.append(spanTag);
      inputTag?.classList.add('ng-dirty');
      inputTag?.classList.add('ng-touched');
    } else {
      inputTag?.classList.remove('ng-dirty');
      inputTag?.classList.remove('ng-valid');
    }
  }

  public gestioValid(spanTag, inputTag, warningTag, divTag, key1, form) {
    spanTag.innerHTML = this.translate.instant('errors.required');

    if (inputTag?.maxLength && inputTag?.maxLength === inputTag?.value?.length && inputTag?.classList.contains('ng-touched')) {
      this.checkMaxLength(warningTag, divTag, key1);
    }
    inputTag?.classList.add('ng-valid');
    inputTag?.classList.add('ng-touched');
  }

  public checkMaxLength(spanTag:any, divTag:any, key1:any) {
    spanTag.innerHTML = this.translate.instant('errors.maxlengthPermes');
    divTag.append(spanTag);
  }

  public ordenarErrors(errors) {
    if (errors.includes('required')) {
      return this.translate.instant('errors.required');
    }
    else if (errors.includes('whiteSpaceLine')) {
      return this.translate.instant('errors.whiteSpaceLine');
    }
    return this.translate.instant(`errors.${errors[0]}`)
  }


}


