import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';
import { AuthService } from '../seguranca/auth.service';

@Directive({
  selector: '[roles]',
  inputs: ['roles']
})
export class RolesDirective {

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private auth: AuthService
  ) {

  }

  @Input() set roles(allowedRoles: Array<string>) {
    let shouldShow = false;
    let rolesArr = new Array<string>();
    if (Array.isArray(allowedRoles[0])) {
      for (const arr of allowedRoles[0]) {
        rolesArr.push(arr);
      }
    } else {
      for (const arr of allowedRoles) {
        rolesArr.push(arr);
      }
    }
    shouldShow = this.auth.temQualquerPermissao(rolesArr);
    if (shouldShow) {
      this._viewContainer.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainer.clear();
    }
  }

}
