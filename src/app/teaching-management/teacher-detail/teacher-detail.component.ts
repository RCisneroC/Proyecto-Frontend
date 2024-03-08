import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { Activity, Documents, Experience, Subject, Teacher, Training } from '../models/Teacher';
import { TeacherService } from '../services/teacher.service';
import Swal from 'sweetalert2';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { AddExperienceComponent } from '../add-experience/add-experience.component';
import { AddTrainingComponent } from '../add-training/add-training.component';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { ViewPosterComponent } from 'app/admission/activitydetail/forms/view-poster/view-poster.component';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { RequiredDocument } from '../models/RequiredDocument';
import { AddActivityComponent } from '../add-activity/add-activity.component';
import { AddSubjectComponent } from '../add-subject/add-subject.component';
import { RequestServicesService } from 'app/intranet-academic-registration/Services/request-services.service';
import { AuthService, User } from '@core';




@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent extends UnsubscribeOnDestroyAdapter
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
    'extension',
    'docResult',

  ];

  displayedColumnsActivities: string[] = [
    'name',
    // 'activityModeId',
    // 'activityTypeId',
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


  constructor(private activatedRoute: ActivatedRoute,
    public _ActivityService: ActivityDetailService,
    public _teacherService: TeacherService,
    public _dialog: MatDialog,
    private _nav: Router,
    private fb: UntypedFormBuilder,
    public _verificarBS64: VerificarBS64Pipe,
    public _RequestService: RequestServicesService,
    public authenticationService: AuthService

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

  async getTeacherByCedula2() {
    this._teacherService.getTeacherByCedula(this.cedula).subscribe({
      next: (res) => {

        this.DataTeacher = res;


      }


    })
  }

  confirmDelete(id: number) {
    //const selectElement = document.querySelector('select');
    //const initialValue = selectElement?.value;
    //console.log(selectElement);
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




    // Swal.fire({
    //   title: 'Esta seguro?',
    //   text: "No podrás revertir esto!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Si, Eliminar!'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     // Perform delete action
    //     console.log('Deleted!');
    //     this.selectedOption=id;
    //     this.viewTable(id);
    //   }
    // });
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
        this.getTeacherByCedula();
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
        this.getTeacherByCedula();
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
    this._nav.navigate(['/teaching-management/teacher-list/']);
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


}
