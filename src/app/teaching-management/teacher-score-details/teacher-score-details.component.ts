import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from "@shared";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Activity, Documents, Experience, PointsListClass, Subject, Teacher, Training } from "../models/Teacher";
import { RequiredDocument } from "../models/RequiredDocument";
import { AuthService, User } from "@core";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityDetailService } from "../../admission/services/activity-detail.service";
import { TeacherService } from "../services/teacher.service";
import { MatDialog } from "@angular/material/dialog";
import { VerificarBS64Pipe } from "../../pipes/verificar-bs64.pipe";
import { RequestServicesService } from "../../intranet-academic-registration/Services/request-services.service";
import { CallsTeachersService } from "../../CallsTeachers/services/calls-teachers.service";
import { MatAccordion } from "@angular/material/expansion";
import { ViewPosterComponent } from "../../admission/activitydetail/forms/view-poster/view-poster.component";
import { ViewPosterPDFComponent } from "../../admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component";
import { AddExperienceComponent } from "../add-experience/add-experience.component";
import { AddActivityComponent } from "../add-activity/add-activity.component";
import Swal from "sweetalert2";
import { AddSubjectComponent } from "../add-subject/add-subject.component";
import { AddTrainingComponent } from "../add-training/add-training.component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-teacher-score-details',
  templateUrl: './teacher-score-details.component.html',
  styleUrls: ['./teacher-score-details.component.scss']
})
export class TeacherScoreDetailsComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  teacherForm!: UntypedFormGroup;
  documentForm!: UntypedFormGroup;
  processList = [
    { id: "0", name: 'Seleccione' },
    { id: "1", name: 'Formación Especializada' },
    { id: "2", name: 'Entrenamiento' },
    { id: "3", name: 'Ambos procesos' }
  ];

  displayedColumnsCourse = [
    'courseId',
    'name',
    'year',
    'actions'
  ];

  displayedColumnsTraining = [
    'trainingId',
    'institution',
    'city',
    'completionDate',
    'degreeDate',
    'educationLevel',
    'degreeObtained',
    'actions'
  ];



  displayedColumnsSpecialty = [
    'specialtyId',
    'name',
    'actions'
  ];

  displayedColumnsExperience = [
    'experienceId',
    'description',
    'position',
    'startDate',
    'endDate',
    'actions'
  ];


  displayedColumnsDoc = [
    'docType',
    'actualizar',
    'validate',
    'docResult',
  ];

  displayedColumnsActivities: string[] = [
    'name',
    //'activityModeId',
    'activityTypeId',
    'actions',
  ];

  displayedColumnsSubject: string[] = [
    'name',
    'actions',
  ];

  DataTeacher!: Teacher;
  DataExperience: Experience[] = [];
  DataDocument: RequiredDocument[] = [];
  DataTraining: Training[] = [];
  listAccumulatedTeacherPoint: PointsListClass[] = [];
  cedula!: string;
  fechaActual!: string;
  fechaA: string | undefined;
  header!: string;
  experience?: Experience;
  training?: Training;
  _Form_Data = new FormData();
  docForm!: UntypedFormGroup;
  viewAct!: boolean;
  viewAsig!: boolean;
  idProces!: number;
  selectedOption: string = '1';
  user!: User;
  typeUser!: string;
  view!: boolean;
  public loadingFile: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    public _ActivityService: ActivityDetailService,
    public _teacherService: TeacherService,
    public _dialog: MatDialog,
    private _nav: Router,
    private fb: UntypedFormBuilder,
    public _verificarBS64: VerificarBS64Pipe,
    public _RequestService: RequestServicesService,
    public authenticationService: AuthService,
    private cb: ChangeDetectorRef,
    private serviceCallsTeachersService: CallsTeachersService,
    public elm: ElementRef,
  ) {
    super();

  }

  //@ViewChild(MatTable) DataTeacher:MatTable<Teacher>
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  async ngOnInit() {
    //this.DataTeacher=this.activatedRoute.snapshot.queryParams["cedula"];
    this.cedula = this.activatedRoute.snapshot.params["cedula"];
    this.user = this.authenticationService.currentUserValue;
    this.typeUser = this._RequestService.getRoleFromToken(this.user.token);


    this.DataTeacher = new Teacher();
    const fechaActual = new Date();
    this.getRequiredDocuments();
    this.fechaA = fechaActual.toLocaleDateString('es-PA');
    this.teacherForm = this.createTeacherForm();
    this.documentForm = this.createDocumentForm();
    this.header = "Crear docente";


    if (this.cedula != "-1") {
      this.header = "Detalle docente";
      await this.getTeacherByCedula();
      await this.getteacherPointsByCedula();
    }

    this.documentForm = this.fb.group({
      Photo: new FormControl([this.DataTeacher.listDocument[0]?.docResult.fileContents]),
      CIP: new FormControl([this.DataTeacher.listDocument[0]?.docResult]),
      Title: new FormControl(this.DataTeacher.listDocument[0]?.docResult),
      CV: new FormControl([]),
    });

    this.docForm = this.fb.group({
      FileDetails: new FormControl([]),
      FileType: new FormControl([]),
    });



  }

  async getRequiredDocuments() {
    this._teacherService.getRequiredDocument().subscribe({
      next: (res) => {

        this.DataDocument = res;

      }
    })
  }

  viewTable(id: number) {

    console.log('====================================');
    console.log(id);
    console.log('====================================');
    localStorage.setItem('tipoSolicitud', id.toString());
    if (id == 1) {
      this.viewAsig = true;
      this.viewAct = false;
    } else if (id == 2) {

      this.viewAct = true;
      this.viewAsig = false;

    } else if (id == 3) {
      this.viewAct = true;
      this.viewAsig = true;
    } else {
      this.viewAct = false;
      this.viewAsig = false;
    }

  }
  GetName(type: number) {

    return this.DataDocument.find(x => x.documentId === type)?.name
  }
  async getTeacherByCedula() {
    this._teacherService.getTeacherByCedula(this.cedula).subscribe({
      next: (res) => {

        this.DataTeacher = res;

        this.fechaA = res.applicationDate;
        this.teacherForm = this.createTeacherForm();
        this.documentForm = this.createDocumentForm();
        /*this.listAccumulatedTeacherPoint = this.DataTeacher.listAccumulatedTeacherPoint.filter(x=>x.points > 0);
        console.log("Listado de puntos",this.listAccumulatedTeacherPoint);*/

        if (this.typeUser == "Administrador") {
          if (this.DataTeacher.statusId != 1) {
            if (this.DataTeacher.listSubject.length > 0 && this.DataTeacher.listActivity.length > 0) {
              this.selectedOption = "3";
            } else if (this.DataTeacher.listSubject.length > 0) {
              this.selectedOption = "1";
            } else if (this.DataTeacher.listActivity.length > 0) {
              this.selectedOption = "2";
            } else {
              this.selectedOption = "0";
            }

            this.viewTable(parseInt(this.selectedOption));
            this.view = true;
            this.cb.detectChanges();
            // this.selectedOption=this.DataTeacher.process.toString();
          } else {
            this.viewTable(this.DataTeacher.process);
          }
        } else {
          this.viewTable(this.DataTeacher.process);
        }
        this._teacherService.isTblLoading = false;
      }
    })
  }

  async getteacherPointsByCedula() {
    this._teacherService.GetTeacherPointByCedula(this.cedula).subscribe({
      next: (res) => {
        this.listAccumulatedTeacherPoint = res.listAccumulatedTeacherPoint;
      }
    })
  }

  async getTeacherByCedula2() {
    this._teacherService.getTeacherByCedula(this.cedula).subscribe({
      next: (res) => {

        this.DataTeacher = res;


      }


    })
  }


  async getTeacherByCedula3() {
    this._teacherService.getTeacherByCedula(this.cedula).subscribe({
      next: (res) => {

        this.DataTeacher = res;

        this.fechaA = res.applicationDate;
        this.teacherForm = this.createTeacherForm();
        this.documentForm = this.createDocumentForm();

        if (this.typeUser == "Administrador") {
          if (this.DataTeacher.statusId != 1) {
            this.viewTable(parseInt(this.selectedOption));
            this.view = true;
            this.cb.detectChanges();
          } else {
            this.viewTable(this.DataTeacher.process);
          }
        } else {
          this.viewTable(this.DataTeacher.process);
        }
        this._teacherService.isTblLoading = false;
      }
    })
  }

  confirmDelete(id: number) {
    //const selectElement = document.querySelector('select');
    //const initialValue = selectElement?.value;
    //console.log(selectElement);

    console.log(id)

    if (id != 3) {
      const idArray: number[] = [];
      this.DataTeacher.listSubject.forEach(obj => idArray.push(obj.id));
      this.deleteSubjectProcess(idArray);

      const idArray2: number[] = [];
      this.DataTeacher.listActivity.forEach(obj => idArray2.push(obj.id));
      this.deleteActProcess(idArray2, id);
      //this.viewTable(id);
    }

    this.getTeacherByCedula2();
    this.viewTable(id);
    this.cb.detectChanges();
  }

  viewDocumento(row: Documents) {

    if (this._verificarBS64.transform(row.docResult.fileContents) != "pdf") {
      const dialogRef = this._dialog.open(ViewPosterComponent, {
        data: {
          type: this._verificarBS64.transform(row.docResult.fileContents),
          accion: 'view-poster',
          posterFile: row.docResult.fileContents,
          comment: "",
          poster: row,
        },
        disableClose: true,
      });
    } else {
      const dialogRef = this._dialog.open(ViewPosterPDFComponent, {
        data: {
          type: this._verificarBS64.transform(row.docResult.fileContents),
          accion: 'view-poster',
          posterFile: row.docResult.fileContents,
          comment: "",
          poster: row,
        },
        width: '1000px',
        disableClose: true,
      });
    }

  }


  AddExperience() {
    const dialogRef = this._dialog.open(AddExperienceComponent, {
      data: {
        experience: this.experience,
        accion: 'add-experience'
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: Experience) => {
      if (result == undefined) {
        return;
      }
      this.DataExperience = [];

      if (this.DataTeacher.listExperience.length > 0) {
        const IdMayor = this.DataTeacher.listExperience.reduce((previous, current) => {
          return current.experienceId > previous.experienceId ? current : previous;
        });
        result.experienceId = IdMayor.experienceId + 1;
      } else {
        result.experienceId = 1;
      }

      this.DataExperience.push(result);

      this.DataTeacher.listExperience = [...this.DataTeacher.listExperience, ...this.DataExperience]

    });
  }

  AddActivity() {
    const dialogRef = this._dialog.open(AddActivityComponent, {
      data: {
        teacher: this.DataTeacher,
        accion: 'add-Activities'
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.getTeacherByCedula3();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });


  }

  AddSubject() {
    const dialogRef = this._dialog.open(AddSubjectComponent, {
      data: {
        teacher: this.DataTeacher,
        accion: 'add-subjects'
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.getTeacherByCedula3();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });


  }

  deleteSubject(row: Subject) {

    const AsignarActivitiesForm = this.fb.group({
      teacherId: [this.DataTeacher.teacherId, [Validators.required]],
      subjectList: this.fb.array([row.id]),
      Action: 2
    });
    this._teacherService.addSubjectTeacher(AsignarActivitiesForm.getRawValue()).subscribe({
      next: () => {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Eliminado correctamente.',
          icon: "success"
        });
        this.getTeacherByCedula();
      },
      error: () => {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Intente nuevamente.',
          icon: "warning"
        });
      }
    })
  }

  deleteSubjectProcess(listNumber: number[]) {

    const AsignarActivitiesForm = this.fb.group({
      teacherId: [this.DataTeacher.teacherId, [Validators.required]],
      subjectList: this.fb.array(listNumber),
      Action: 2
    });
    this._teacherService.addSubjectTeacher(AsignarActivitiesForm.getRawValue()).subscribe({
      next: () => {

      },
      error: () => {

      }
    })
  }

  deleteActProcess(listNumber: number[], id: number) {

    const AsignarActivitiesForm = this.fb.group({
      teacherId: [this.DataTeacher.teacherId, [Validators.required]],
      activityList: this.fb.array(listNumber),
      Action: 2
    });
    this._teacherService.addActivitiesTeacher(AsignarActivitiesForm.getRawValue()).subscribe({
      next: () => {

      },
      error: () => {

      }
    })
  }


  deleteAct(row: Activity) {

    const AsignarActivitiesForm = this.fb.group({
      teacherId: [this.DataTeacher.teacherId, [Validators.required]],
      activityList: this.fb.array([row.id]),
      Action: 2
    });
    this._teacherService.addActivitiesTeacher(AsignarActivitiesForm.getRawValue()).subscribe({
      next: () => {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Eliminado correctamente.',
          icon: "success"
        });
        this.getTeacherByCedula();
      },
      error: () => {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Intente nuevamente.',
          icon: "warning"
        });
      }
    })
  }
  AddTraining() {
    const dialogRef = this._dialog.open(AddTrainingComponent, {
      data: {
        training: this.training,
        accion: 'add-training'
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: Training) => {
      if (result == undefined) {
        return;
      }
      this.DataTraining = [];

      if (this.DataTeacher.listTraining.length > 0) {
        const IdMayor = this.DataTeacher.listTraining.reduce((previous, current) => {
          return current.trainingId > previous.trainingId ? current : previous;
        });
        result.trainingId = IdMayor.trainingId + 1;
      } else {
        result.trainingId = 1;
      }

      this.DataTraining.push(result);

      this.DataTeacher.listTraining = [...this.DataTeacher.listTraining, ...this.DataTraining]

    });
  }
  RemoveExperience(row: Experience) {

    this.DataExperience = [];
    this.DataExperience = this.DataTeacher.listExperience.filter(x => x.experienceId != row.experienceId)
    this.DataTeacher.listExperience = [...this.DataExperience]

  }
  Regresar() {
    this._nav.navigate(['/teaching-management/teacher-score-list/']);
  }
  verDetallesTeach() {
    this._nav.navigate(['/teaching-management/teacher-detail/' + this.cedula]);
  }
  Historial() {

    this._nav.navigate(['/teaching-management/career-list/', this.DataTeacher.cedula]);
  }





  createTeacherForm(): UntypedFormGroup {
    return this.fb.group({
      teacherId: new FormControl(0),
      cedula: new FormControl(this.DataTeacher?.cedula, [Validators.required]),
      name: new FormControl(this.DataTeacher?.name, [Validators.required]),
      lastName: new FormControl(this.DataTeacher?.lastName, [Validators.required]),
      email: new FormControl(this.DataTeacher?.email, [Validators.required, Validators.email]),
      selected: new FormControl(this.DataTeacher?.selected),
      //dischargeDate: new FormControl(this.DataTeacher?.dischargeDate),

      phoneNumber: new FormControl(this.DataTeacher?.phoneNumber),
      gender: new FormControl(this.DataTeacher?.gender),
      placeOfBirth: new FormControl(this.DataTeacher?.placeOfBirth),
      dateOfBirth: new FormControl(this.DataTeacher?.dateOfBirth),
      placeResidence: new FormControl(this.DataTeacher?.placeResidence),
      listCourse: new FormControl(this.DataTeacher?.listCourse || []),
      listTraining: new FormControl(this.DataTeacher?.listTraining || []),
      listSpecialty: new FormControl(this.DataTeacher?.listSpecialty || []),
      listExperience: new FormControl(this.DataTeacher?.listExperience || []),
      listDocument: new FormControl(this.DataTeacher?.listDocument || []),
      process: new FormControl(1),
      createdBy: new FormControl(this.DataTeacher?.dischargeDate)

    });
  }

  onFileSelected(event: any) {


    const file = event.target.files[0];
    //   console.log(this.documentForm.getRawValue());
    const formdata = new FormData();
    //  const list: fileDetails[]=[];
    //   list[0].fileDetails=File1;
    //   list[0].fileType=1
    formdata.append('FileDetails', file);




    this._teacherService.archivo(formdata).subscribe({
      next: () => {
        console.log("guardado");
      },
      error: () => {

      }
    })
  }

  submit() {
    //const file=this.documentForm.get('CIP')?.value;
    console.log(this._Form_Data);

    this.teacherForm?.get('listDocument')?.setValue(this.DataTeacher?.listDocument);
    this.teacherForm?.get('listExperience')?.setValue(this.DataTeacher?.listExperience);
    this.teacherForm?.get('listTraining')?.setValue(this.DataTeacher?.listTraining);
    if (this.teacherForm.valid)

      this._teacherService.addUpdateTeacher(this.teacherForm.value).subscribe({
        next: () => {
          Swal.fire({
            title: "Escuela Judicial",
            text: 'Guardado correctamente.',
            icon: "success"
          });

        },
        error: () => {
          Swal.fire({
            title: "Escuela Judicial",
            text: 'Intente nuevamente.',
            icon: "warning"
          });
        }
      })

    this._nav.navigate(['/teaching-management/teacher-list/']);
    // emppty stuff
  }

  removeTraining(row: Training) {
    this.DataTraining = [];
    this.DataTraining = this.DataTeacher.listTraining.filter(x => x.trainingId != row.trainingId)
    this.DataTeacher.listTraining = [...this.DataTraining]

  }

  createDocumentForm(): UntypedFormGroup {
    return this.fb.group({
      Photo: new FormControl([this.DataTeacher.listDocument[0]?.docResult.fileContents]),
      CIP: new FormControl([this.DataTeacher.listDocument[0]?.docResult]),
      Title: new FormControl(this.DataTeacher.listDocument[0]?.docResult),
      CV: new FormControl([])
    });
  }

  validarDocumentos(row: Documents) {

    this._teacherService.ValidateDocument(row.documentId, this.authenticationService.currentUserValue.firstName + ' ' + this.authenticationService.currentUserValue.lastName).subscribe(
      {
        next: (request: any) => {
          Swal.fire({
            title: "Escuela Judicial",
            text: 'Documento validado con éxito',
            icon: "success"
          });
          this.ngOnInit();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          Swal.fire({
            title: "Escuela Judicial",
            text: 'El documento no se pudo validar',
            icon: "warning"
          });
        }
      }
    );

  }

  onChangeFile(event: any, docTypeId: number, obj: Documents) {
    this.loadingFile = true;
    const files: FileList = event.target.files;
    const elementImg = this.elm.nativeElement.querySelector('#archivo_' + docTypeId);
    const elementText = this.elm.nativeElement.querySelector('#texto_' + docTypeId);
    if (files.length > 0) {
      if (files[0].type != 'application/pdf' && files[0].type != 'image/png' && files[0].type != 'image/jpeg') {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Solo se permite tipo de archivo PDF/JPG/PNG.',
          icon: "warning"
        });
        this.loadingFile = false;
        elementImg.value = '';
        return;
      }
      const formdata = new FormData();
      formdata.append('teacherId', this.cedula);
      formdata.append('docTypeId', docTypeId.toString());
      formdata.append('documentId', obj.documentId.toString());
      formdata.append('FileDetails', files[0]);
      this.serviceCallsTeachersService.updateDocuments(formdata).subscribe(
        {
          next: (res: any) => {
            Swal.fire({
              title: "Escuela Judicial",
              text: '(' + this.GetName(obj.docType) + ') Cargado Correctamente.',
              icon: "success"
            });
            elementImg.value = '';
            elementText.innerHTML = '(' + this.GetName(obj.docType) + ') ' + 'Cargado Correctamente.';
            this.ngOnInit();
            this.loadingFile = false;

          }, error: (err: HttpErrorResponse) => {
            console.log(err);

            elementImg.value = '';
            Swal.fire({
              title: "Escuela Judicial",
              text: 'Intente nuevamente..',
              icon: "warning"
            });
            this.loadingFile = false;
          }
        }
      );

    }
  }

}
