import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdmissionRoutingModule } from './admission-routing.module';
import { ActivityListComponent } from './maestros/activity-list/activity-list.component';
import { LoungeListComponent } from './maestros/lounge-list/lounge-list.component';
import { ReasonListComponent } from './maestros/reason-list/reason-list.component';
import { TypeActivityListComponent } from './maestros/type-activity-list/type-activity-list.component';
import { ModalityListComponent } from './maestros/modality-list/modality-list.component';
import { LoungeFormComponent } from './maestros/lounge-form/lounge-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { ScheduleActivityFormComponent } from './schedule-activity-form/schedule-activity-form.component';
import { ScheduleActivitiesListComponent } from './schedule-activities-list/schedule-activities-list.component';
import { ActivityFormComponent } from './maestros/activity-form/activity-form.component';
import { ScheduleActivityDetailComponent } from './schedule-activity-detail/schedule-activity-detail.component';
import { ScheduleActivityDetailFormComponent } from './schedule-activity-detail-form/schedule-activity-detail-form.component';
import { BackofficeComponent } from './inscription/backoffice/backoffice.component';
import { ModalityFormComponent } from './maestros/modality-form/modality-form.component';
import { TypeActivityFormComponent } from './maestros/type-activity-form/type-activity-form.component';
import { ReasonFormComponent } from './maestros/reason-form/reason-form.component';
import { SourceFundsFormComponent } from './maestros/source-funds-form/source-funds-form.component';
import { SourceFundsListComponent } from './maestros/source-funds-list/source-funds-list.component';
import { ActivityUbicationListComponent } from './maestros/activity-ubication-list/activity-ubication-list.component';
import { ActivityUbicationFormComponent } from './maestros/activity-ubication-form/activity-ubication-form.component';
import { SuppliesListComponent } from './maestros/supplies-list/supplies-list.component';
import { SuppliesListFormComponent } from './maestros/supplies-list-form/supplies-list-form.component';
import { DocumentRequiredFormComponent } from './maestros/document-required-form/document-required-form.component';
import { DocumentRequiredListComponent } from './maestros/document-required-list/document-required-list.component';
import { StatusListComponent } from './maestros/status-list/status-list.component';
import { StatusFormComponent } from './maestros/status-form/status-form.component';
import { ActivitydetailComponent } from './activitydetail/activitydetail.component';
import { ListCurriculumDesignComponent } from './Approvals/list-curriculum-design/list-curriculum-design.component';
import { DeatilActivityCurriculumDesignComponent } from './Approvals/deatil-activity-curriculum-design/deatil-activity-curriculum-design.component';


// import { MatFileUploadModule } from 'angular-material-fileupload';
import { ScheduleListComponent } from './inscription/schedule-list/schedule-list.component';
import { ActivityListInscriptionComponent } from './inscription/activity-list-inscription/activity-list-inscription.component';
import { ActivityParticipantsListComponent } from './inscription/approval/activity-participants-list/activity-participants-list.component';
import { RequestRoomComponent } from './request-room/request-room.component';
import { DocumentRequeridosComponent } from './activitydetail/forms/document-requeridos/document-requeridos.component';
import { PosterRequeridosComponent } from './activitydetail/forms/poster-requeridos/poster-requeridos.component';
import { RoomRequestsComponent } from './activitydetail/forms/room-requests/room-requests.component';
import { AsignarDocentesComponent } from './activitydetail/forms/asignar-docentes/asignar-docentes.component';
import { AsignarCooperantesComponent } from './activitydetail/forms/asignar-cooperantes/asignar-cooperantes.component';
import { ViewPosterComponent } from './activitydetail/forms/view-poster/view-poster.component';
import { ViewPosterPDFComponent } from './activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { ListRequestPosterComponent } from './Approvals/list-request-poster/list-request-poster.component';
import { ListRequestRoomsComponent } from './Approvals/list-request-rooms/list-request-rooms.component';
import { DetailsRequestRoomsComponent } from './Approvals/details-request-rooms/details-request-rooms.component';
import { DetailsRequestPosterComponent } from './Approvals/details-request-poster/details-request-poster.component';
import { ApprovedCurriculumComponent } from './Approvals/form/approved-curriculum/approved-curriculum.component';
import { ApprovedActivityComponent } from './Approvals/form/approved-activity/approved-activity.component';
import { ApprovedPosterComponent } from './Approvals/form/approved-poster/approved-poster.component';
import { ListCooperatingOrganizationComponent } from './maestros/list-cooperating-organization/list-cooperating-organization.component';
import { FormCooperatingOrganizationComponent } from './maestros/form-cooperating-organization/form-cooperating-organization.component';
import { ViewLogoComponent } from './activitydetail/forms/view-logo/view-logo.component';
import { EditActivityFormsComponent } from './activitydetail/forms/edit-activity-forms/edit-activity-forms.component';
import { ReservaSalonesComponent } from './activitydetail/forms/room-requests/forms/reserva-salones/reserva-salones.component';
import { RequerimientoSalonesComponent } from './activitydetail/forms/room-requests/forms/requerimiento-salones/requerimiento-salones.component';
import { NuevaSolicitudComponent } from './activitydetail/forms/room-requests/forms/nueva-solicitud/nueva-solicitud.component';
import { ApprovedRoomsComponent } from './Approvals/form/approved-rooms/approved-rooms.component';
import { ListscheduleComponent } from './inscription/approval/listschedule/listschedule.component';
import { ListActivityComponent } from './inscription/approval/list-activity/list-activity.component';
import { DetalleParticipanteComponent } from './inscription/approval/activity-participants-list/detalle/detalle-participante/detalle-participante.component';
import { ApproveParticipantComponent } from './inscription/approval/activity-participants-list/detalle/approve-participant/approve-participant.component';
import { ApprovalIncriptionComponent } from './inscription/educacionformal/approval/approval-incription/approval-incription.component';
import { BackofficeEFComponent } from './inscription/educacionformal/forms/backoffice-ef/backoffice-ef.component';
import { InfoAcademicaComponent } from './inscription/educacionformal/forms/info-academica/info-academica.component';
import { InfoExperienciaComponent } from './inscription/educacionformal/forms/info-experiencia/info-experiencia.component';
import { DegreeComponent } from './FormalEducations/Maestros/degree/degree.component';
import { DegreeAdmissionRequirementComponent } from './FormalEducations/Maestros/degree-admission-requirement/degree-admission-requirement.component'
import { DegreeCompetenceComponent } from './FormalEducations/Maestros/degree-competence/degree-competence.component';
import { RoomsComponent } from './FormalEducations/Maestros/rooms/rooms.component';
import { StatusComponent } from './FormalEducations/Maestros/status/status.component';
import { StudyModeComponent } from './FormalEducations/Maestros/study-mode/study-mode.component';
import { SubjectComponent } from './FormalEducations/Maestros/subject/subject.component';
import { AnnualPlanComponent } from './FormalEducations/Gestions/annual-plan/annual-plan.component';
import { CurriculumDesignComponent } from './FormalEducations/Gestions/curriculum-design/curriculum-design.component';
import { CurriculumSubjectComponent } from './FormalEducations/Gestions/curriculum-subject/curriculum-subject.component';
import { DegreeAdminissionRequirementComponent } from './FormalEducations/Gestions/curriculum-design/degree-adminission-requirement/degree-adminission-requirement.component';
import { DeggreeCompetenceComponent } from './FormalEducations/Gestions/curriculum-design/deggree-competence/deggree-competence.component';
import { FormsDegreeComponent } from './FormalEducations/Maestros/Forms/forms-degree/forms-degree.component';
import { FormsRequirementDegreeComponent } from './FormalEducations/Maestros/Forms/forms-requirement-degree/forms-requirement-degree.component';
import { FormsRoomsComponent } from './FormalEducations/Maestros/Forms/forms-rooms/forms-rooms.component';
import { FormsStatusComponent } from './FormalEducations/Maestros/Forms/forms-status/forms-status.component';
import { FormsStudyModeComponent } from './FormalEducations/Maestros/Forms/forms-study-mode/forms-study-mode.component';
import { FormsSubjectComponent } from './FormalEducations/Maestros/Forms/forms-subject/forms-subject.component';
import { PlanListInscriptionComponent } from './inscription/educacionformal/approval/plan-list-inscription/plan-list-inscription.component';
import { MeshListInscriptionComponent } from './inscription/educacionformal/approval/mesh-list-inscription-component/mesh-list-inscription-component.component';
import { PartakerListInscriptionComponent } from './inscription/educacionformal/approval/partaker-list-inscription-component/partaker-list-inscription-component.component';
import { DegreeDetailsComponent } from './FormalEducations/Maestros/Details/degree-details/degree-details.component';
import { SubjectDetailsComponent } from './FormalEducations/Maestros/Details/subject-details/subject-details.component';
import { AddDocumentosComponent } from './FormalEducations/Maestros/Details/Forms/add-documentos/add-documentos.component';
import { AddPosterComponent } from './FormalEducations/Maestros/Details/Forms/add-poster/add-poster.component';
import { AddCompetenciasComponent } from './FormalEducations/Maestros/Details/Forms/add-competencias/add-competencias.component';
import { SubjectCurriculumComponent } from './FormalEducations/Maestros/Details/subject-curriculum/subject-curriculum.component';
import { AddMallaCurricularComponent } from './FormalEducations/Maestros/Details/Forms/add-malla-curricular/add-malla-curricular.component';
import { EditAddFormsComponent } from './FormalEducations/Gestions/Forms/edit-add-forms/edit-add-forms.component';
import { CreatePeriodComponent } from './FormalEducations/Gestions/Forms/create-period/create-period.component';
import { AsignacionMallaComponent } from './FormalEducations/Gestions/Forms/asignacion-malla/asignacion-malla.component';
import { DetallePlanAnualComponent } from './FormalEducations/Gestions/Details/detalle-plan-anual/detalle-plan-anual.component';
import { AsignaturasPeriodosComponent } from './FormalEducations/Gestions/Details/asignaturas-periodos/asignaturas-periodos.component';
import { ListAnnualPlanComponent } from './FormalEducations/Approvals/list-annual-plan/list-annual-plan.component';
import { ListPosterComponent } from './FormalEducations/Approvals/list-poster/list-poster.component';
import { ListDegreeCurricularComponent } from './FormalEducations/Approvals/list-degree-curricular/list-degree-curricular.component';
import { ApprovedDegreeComponent } from './FormalEducations/Approvals/Forms/approved-degree/approved-degree.component';
import { ApprovedAnnualPlanComponent } from './FormalEducations/Approvals/Forms/approved-annual-plan/approved-annual-plan.component';
import { ApprovedPosterTwoComponent } from './FormalEducations/Approvals/Forms/approved-poster-two/approved-poster-two.component';
import { CreateAsignedComponent } from './FormalEducations/Gestions/Forms/create-asigned/create-asigned.component';
import { PartakerDetailInscriptionComponent } from './inscription/educacionformal/approval/partaker-detail-inscription-component/partaker-detail-inscription-component.component';
import { CreateRoomsComponent } from './FormalEducations/Gestions/Details/create-rooms/create-rooms.component';
import { CreateRoomsPeriodComponent } from './FormalEducations/Gestions/Forms/create-rooms-period/create-rooms-period.component';
import { CreteAsignacionDocenteComponent } from './FormalEducations/Gestions/Forms/crete-asignacion-docente/crete-asignacion-docente.component';
import { ShowDocentesAsignadoComponent } from './FormalEducations/Gestions/Forms/show-docentes-asignado/show-docentes-asignado.component';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { FormsCertificateComponent } from './activitydetail/forms/forms-certificate/forms-certificate.component';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DetailsEventsComponent } from './activitydetail/details-events/details-events.component';
import { CreateEventsComponent } from './activitydetail/details-events/Forms/create-events/create-events.component';
import { DesignCurriculunComponent } from './activitydetail/design-curriculun/design-curriculun.component';
import { CreateModulesComponent } from './activitydetail/design-curriculun/Forms/create-modules/create-modules.component';
import { CreatePlanStudyFormsComponent } from './activitydetail/design-curriculun/Forms/create-plan-study-forms/create-plan-study-forms.component';
import { DetailsModulesComponent } from './activitydetail/design-curriculun/Module/details-modules/details-modules.component';
import { EvaluationsCriteriaFormsComponent } from './activitydetail/design-curriculun/Module/Foms/evaluations-criteria-forms/evaluations-criteria-forms.component';
import { ActivityLearningFormsComponent } from './activitydetail/design-curriculun/Module/Foms/activity-learning-forms/activity-learning-forms.component';
import { DirectoryListComponent } from './maestros/directory-list/directory-list.component';
import { DirectoryFormComponent } from './maestros/directory-form/directory-form.component';
import { TimeSlotsComponent } from './maestros/time-slots/time-slots.component';
import { FranjaHorariaComponent } from './activitydetail/forms/room-requests/forms/franja-horaria/franja-horaria.component';

@NgModule({
  declarations: [
    ActivityListComponent,
    LoungeListComponent,
    ReasonListComponent,
    TypeActivityListComponent,
    ModalityListComponent,
    LoungeFormComponent,
    ScheduleActivityFormComponent,
    ScheduleActivitiesListComponent,
    ActivityFormComponent,
    ScheduleActivityDetailComponent,
    ScheduleActivityDetailFormComponent,
    BackofficeComponent,
    // ExternalUserComponent,
    // InternalUserComponent,

    ActivityListInscriptionComponent,

    ModalityFormComponent,
    TypeActivityFormComponent,
    ReasonFormComponent,
    SourceFundsFormComponent,
    SourceFundsListComponent,
    ActivityUbicationListComponent,
    ActivityUbicationFormComponent,
    SuppliesListComponent,
    SuppliesListFormComponent,
    DocumentRequiredFormComponent,
    DocumentRequiredListComponent,
    StatusListComponent,
    StatusFormComponent,
    ActivitydetailComponent,
    ListCurriculumDesignComponent,
    DeatilActivityCurriculumDesignComponent,
    ScheduleListComponent,
    ActivityParticipantsListComponent,
    RequestRoomComponent,
    DocumentRequeridosComponent,
    PosterRequeridosComponent,
    RoomRequestsComponent,
    AsignarDocentesComponent,
    AsignarCooperantesComponent,
    ViewPosterComponent,
    ViewPosterPDFComponent,
    ListRequestPosterComponent,
    ListRequestRoomsComponent,
    DetailsRequestRoomsComponent,
    DetailsRequestPosterComponent,
    ApprovedCurriculumComponent,
    ApprovedActivityComponent,
    ApprovedPosterComponent,
    ListCooperatingOrganizationComponent,
    FormCooperatingOrganizationComponent,
    ViewLogoComponent,
    EditActivityFormsComponent,
    ReservaSalonesComponent,
    RequerimientoSalonesComponent,
    NuevaSolicitudComponent,
    ApprovedRoomsComponent,
    ListscheduleComponent,
    ListActivityComponent,
    DetalleParticipanteComponent,
    ApproveParticipantComponent,
    ApprovalIncriptionComponent,
    BackofficeEFComponent,
    InfoAcademicaComponent,
    InfoExperienciaComponent,
    DegreeComponent,
    DegreeAdmissionRequirementComponent,
    DegreeCompetenceComponent,
    RoomsComponent,
    StatusComponent,
    StudyModeComponent,
    SubjectComponent,
    AnnualPlanComponent,
    CurriculumDesignComponent,
    CurriculumSubjectComponent,
    DegreeAdminissionRequirementComponent,
    DeggreeCompetenceComponent,
    FormsDegreeComponent,
    FormsRequirementDegreeComponent,
    FormsRoomsComponent,
    FormsStatusComponent,
    FormsStudyModeComponent,
    PlanListInscriptionComponent,
    MeshListInscriptionComponent,
    PartakerListInscriptionComponent,

    FormsSubjectComponent,
    DegreeDetailsComponent,
    SubjectDetailsComponent,
    AddDocumentosComponent,
    AddPosterComponent,
    AddCompetenciasComponent,
    SubjectCurriculumComponent,
    AddMallaCurricularComponent,
    EditAddFormsComponent,
    CreatePeriodComponent,
    AsignacionMallaComponent,
    DetallePlanAnualComponent,
    AsignaturasPeriodosComponent,
    ListAnnualPlanComponent,
    ListPosterComponent,
    ListDegreeCurricularComponent,
    ApprovedDegreeComponent,
    ApprovedAnnualPlanComponent,
    ApprovedPosterComponent,
    ApprovedPosterTwoComponent,
    CreateAsignedComponent,
    PartakerDetailInscriptionComponent,
    CreateRoomsComponent,
    CreateRoomsPeriodComponent,
    CreteAsignacionDocenteComponent,
    ShowDocentesAsignadoComponent,
    FormsCertificateComponent,
    DetailsEventsComponent,
    CreateEventsComponent,
    DesignCurriculunComponent,
    CreateModulesComponent,
    CreatePlanStudyFormsComponent,
    DetailsModulesComponent,
    EvaluationsCriteriaFormsComponent,
    ActivityLearningFormsComponent,
    DirectoryListComponent,
    DirectoryFormComponent,
    TimeSlotsComponent,
    FranjaHorariaComponent
  ],
  providers: [VerificarBS64Pipe,DatePipe],
  imports: [
    CommonModule,
    AdmissionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CKEditorModule
  ]
})
export class AdmissionModule { }
