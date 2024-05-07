import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForoComponent } from "./foro/foro.component";
import { CategoryForoComponent } from './category-foro/category-foro.component';
import { ForoDetailsComponent } from './foro-details/foro-details.component';


const routes: Routes = [
  {
    path: "category",
    component: CategoryForoComponent
  },
  {
    path: "foro",
    component: ForoComponent
  },
  {
    path: "foro-detalle/:id",
    component: ForoDetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForoRoutingModule { }
