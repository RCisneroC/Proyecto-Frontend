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
import { MenuComponent } from './menu/menu.component';
import { FormsMenuComponent } from './forms-menu/forms-menu.component';
import { ViewMenuModalComponent } from './view-menu-modal/view-menu-modal.component';
import { AuditLogSearchComponent } from './audit-log-search/audit-log-search.component';

@NgModule({
  declarations: [
    UserListComponent,
    RoleListComponent,
    RoleFormComponent,
    UserFormComponent,
    FormsAsignedRolesComponent,
    MenuComponent,
    FormsMenuComponent,
    ViewMenuModalComponent,
    AuditLogSearchComponent
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
