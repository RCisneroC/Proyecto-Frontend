import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material.module";
import { FeatherIconsModule } from "./components/feather-icons/feather-icons.module";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { StatusPipePipe } from "../pipes/status-pipe.pipe";
import { VerificarBS64Pipe } from "app/pipes/verificar-bs64.pipe";

@NgModule({
  declarations: [StatusPipePipe, VerificarBS64Pipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FeatherIconsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTableModule,
    StatusPipePipe,
    VerificarBS64Pipe


  ],
})
export class SharedModule { }
