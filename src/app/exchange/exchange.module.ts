import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "@shared/components/components.module";
import {SharedModule} from "@shared";
import { ForoComponent } from './foro/foro.component';
import {ForoRoutingModule} from "./exchange-routing.module";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import { CategoryForoComponent } from './category-foro/category-foro.component';
import { ForoDetailsComponent } from './foro-details/foro-details.component';
import { CategoryFormsForoComponent } from './Forms/category-forms-foro/category-forms-foro.component';
import { FormsForoCreateComponent } from './Forms/forms-foro-create/forms-foro-create.component';



@NgModule({
  declarations: [
    ForoComponent,
    CategoryForoComponent,
    ForoDetailsComponent,
    CategoryFormsForoComponent,
    FormsForoCreateComponent
  ],
  imports: [
    ForoRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    CKEditorModule,
  ]
})
export class ExchangeModule { }
