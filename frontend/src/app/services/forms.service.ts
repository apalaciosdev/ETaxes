import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FormsService {
 
  constructor(
    private translate: TranslateService
  ){}

  public gestionarValidarErrors(form:any, marcarDirty?:any) {
    Object.keys(form.value).forEach(key => {
      setTimeout(() => {
        if (marcarDirty) {
          form.controls[key]?.markAsDirty()
        }
        this.gestioValidarCamps(key, form);
      })
      if (key && !marcarDirty) {
        form.get(key)?.valueChanges.subscribe((value:any, key1:any) => {
          setTimeout(() => {
            this.gestioValidarCamps(key, form);
          })
        });
      }
    })
  }

  
  public gestioValidarCamps(key1:any, form:any) {
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
  
  public gestioErrors(spanTag:any, key1:any, inputTag:any, form:any, divTag:any) {
    spanTag.innerHTML = this.ordenarErrors(Object.keys(form.controls[key1].errors));
    if (form.controls[key1]?.dirty) {
      divTag?.append(spanTag);
      inputTag?.classList.add('ng-dirty');
      inputTag?.classList.add('ng-touched');
      inputTag?.classList.add('error-campo');
      inputTag?.classList.remove('ok-campo');
    } else {
      inputTag?.classList.remove('ng-dirty');
      inputTag?.classList.remove('ok-campo');
      inputTag?.classList.remove('ng-valid');
    }
  }

  public gestioValid(spanTag:any, inputTag:any, warningTag:any, divTag:any, key1:any, form:any) {
    spanTag.innerHTML = this.translate.instant('errors.required');

    if (inputTag?.maxLength && inputTag?.maxLength === inputTag?.value?.length && inputTag?.classList.contains('ng-touched')) {
      // this.checkMaxLength(warningTag, divTag, key1);
    }
    inputTag?.classList.add('ok-campo');
    inputTag?.classList.add('ng-valid');
    inputTag?.classList.remove('error-campo');
    inputTag?.classList.add('ng-touched');
  }

  public checkMaxLength(spanTag:any, divTag:any, key1:any) {
    spanTag.innerHTML = this.translate.instant('errors.maxlengthPermes');
    divTag.append(spanTag);
  }

  public ordenarErrors(errors:any) {
    if (errors.includes('required')) {
      return this.translate.instant('errors.required');
    }
    else if (errors.includes('whiteSpaceLine')) {
      return this.translate.instant('errors.whiteSpaceLine');
    }
    return this.translate.instant(`errors.${errors[0]}`)
  }

  public firstUpperCase(form:any, control:any){
    const valueToUpperCase = form.get(control).value;
    form.get(control).setValue(valueToUpperCase.charAt(0).toUpperCase() + valueToUpperCase.slice(1));
  }


}


