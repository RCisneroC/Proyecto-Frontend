import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { UserListComponent } from './user/user-list/user-list.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgChartsModule } from 'ng2-charts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgApexchartsModule } from 'ng-apexcharts';
import {SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from './role/role-list/services/role.service';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    UserListComponent,
    RoleListComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    NgChartsModule,
    NgApexchartsModule,
    NgScrollbarModule,
    DragDropModule,
    ComponentsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
   
  ],
  providers: [RoleService]
})
export class SecurityModule { }
