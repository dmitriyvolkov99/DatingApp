import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEdit } from '../members/member-edit/member-edit';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: MemberEdit): boolean {
    if(component.editForm.dirty){
      return confirm("Are you sure want you want to continue?");
    }
    return true;
  }
  
}
