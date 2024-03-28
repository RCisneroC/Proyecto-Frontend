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
import { RequestVariousTypeIdPipe } from "../pipes/request-various-type-id.pipe";
import { RequestVariousApplicantUserTypeIdPipe } from "../pipes/request-various-applicant-user-type-id.pipe";
import { RequestVariousStatusPipe } from "../pipes/request-various-status.pipe";
import { RequestVariousActivityAcademicTypePipe } from "../pipes/request-various-activity-academic-type.pipe";
import { RequestVariousTypePipe } from "../pipes/request-various-type.pipe";
import { StatusTeacherPipe } from '../pipes/status-teacher.pipe';
import { EntityTypePipe } from '../pipes/entity-type.pipe';
import { StatusMatriculaPipe } from "app/pipes/status-matricula.pipe";
import { StatusProcessPipe } from "app/pipes/status-process.pipe";

@NgModule({
  declarations: [StatusPipePipe, VerificarBS64Pipe, RequestVariousTypeIdPipe, RequestVariousApplicantUserTypeIdPipe, RequestVariousStatusPipe, RequestVariousActivityAcademicTypePipe, RequestVariousTypePipe, StatusTeacherPipe, EntityTypePipe, StatusMatriculaPipe, StatusProcessPipe],
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
    VerificarBS64Pipe,
    RequestVariousTypeIdPipe,
    RequestVariousApplicantUserTypeIdPipe,
    RequestVariousStatusPipe,
    RequestVariousActivityAcademicTypePipe,
    RequestVariousTypePipe,
    StatusTeacherPipe,
    EntityTypePipe,
    StatusMatriculaPipe,
    StatusProcessPipe
  ],
})
export class SharedModule { }
