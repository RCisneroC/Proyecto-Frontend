import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { RoleListComponent } from './role/role-list/role-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { UserListComponent } from './user/user-list/user-list.component';
import { RoleFormComponent } from './role/role-form/role-form.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { FormsAsignedRolesComponent } from './role/forms-asigned-roles/forms-asigned-roles.component';

@NgModule({
  declarations: [
    UserListComponent,
    RoleListComponent,
    RoleFormComponent,
    UserFormComponent,
    FormsAsignedRolesComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule
  ]
})
export class SecurityModule { }
