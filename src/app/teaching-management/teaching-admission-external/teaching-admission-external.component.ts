import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Documents, Experience, Teacher, Training } from '../models/Teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { TeacherService } from '../services/teacher.service';
import { MatDialog } from '@angular/material/dialog';
import { AddExperienceComponent } from '../add-experience/add-experience.component';
import { AddTrainingComponent } from '../add-training/add-training.component';
import Swal from 'sweetalert2';
import { RequiredDocument } from '../models/RequiredDocument';
import { MatStepper } from '@angular/material/stepper';
import { EncryptDescryptService } from 'app/CallsTeachers/services/encrypt-descrypt.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CallsTeachersService } from 'app/CallsTeachers/services/calls-teachers.service';
import { ViewPosterComponent } from 'app/admission/activitydetail/forms/view-poster/view-poster.component';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { tickStep } from 'd3';



@Component({
  selector: 'app-teaching-admission-external',
  templateUrl: './teaching-admission-external.component.html',
  styleUrls: ['./teaching-admission-external.component.scss']
})
export class TeachingAdmissionExternalComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  teacherForm!: UntypedFormGroup;
  documentForm!: UntypedFormGroup;
  processList = [
    { id: 1, name: 'Formación' },
    { id: 2, name: 'Educación continua' },
    { id: 3, name: 'Ambos procesos' }
  ];
  tmp_files: any[50] = [];
  tmp_docType: any[50] = [];
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
    'workplace',
    'startDate',
    'endDate',
    'actions'
  ];


  DataTeacher!: Teacher;
  DataRequiredDocuments: RequiredDocument[] = [];
  DataExperience: Experience[] = [];
  DataTraining: Training[] = [];
  fechaActual!: string;
  fechaA: string | undefined;
  header!: string;
  experience?: Experience;
  training?: Training;
  _Form_Data = new FormData();
  viewMessage?: boolean;
  FormsEFDocument!: UntypedFormGroup;
  public id: number = 0;
  public type: string | null = null;



  @ViewChild('stepper') stepper: MatStepper | undefined;
  viewAlert: boolean = false;
  viewAlert1: boolean = false;
  load: boolean = true;
  processId:number = 0;

  constructor(private activatedRoute: ActivatedRoute,
    public _ActivityService: ActivityDetailService,
    public _teacherService: TeacherService,
    public _dialog: MatDialog,
    private _nav: Router,
    private fb: UntypedFormBuilder,
    public _verificarBS64: VerificarBS64Pipe,
    private serviceEncryptDescryptService: EncryptDescryptService,
    private router: Router,
    private serviceCallsTeachers: CallsTeachersService
  ) {
    super();
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] != null && params['id'] != undefined) {
        this.id = parseInt(this.serviceEncryptDescryptService.decrypt(params['id']));
      }

      if (params['type'] != null && params['type'] != undefined) {
        this.type = this.serviceEncryptDescryptService.decrypt(params['type']);
        console.log("Type " + this.type);
      }

    });
  }


  ngOnInit() {

    this.DataTeacher = new Teacher();
    const fechaActual = new Date();
    this.fechaA = fechaActual.toLocaleDateString('es-PA');
    this.teacherForm = this.createTeacherForm();

    this.FormsEFDocument = this.fb.group({});
    this.getProcess();
    this.getRequiredDocuments();
    // , [this.cedulaExist()]
    this.teacherForm = this.fb.group({
      teacherId: new FormControl(0),
      cedula: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      placeOfBirth: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      placeResidence: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      carreraId: [true, [Validators.required]],
      selected: new FormControl(false),
      listCourse: new FormControl([]),
      listTraining: new FormControl([]),
      listSpecialty: new FormControl([]),
      listExperience: new FormControl([]),
      listDocument: new FormControl([]),
      ListSubject: new FormControl([]),
      listActivity: new FormControl([]),
      process: new FormControl(4),
      createdBy: new FormControl("")
    })


  }

  async getRequiredDocuments() {
    this._teacherService.getRequiredDocument().subscribe({
      next: (res) => {
        if (this.type === "C") {
              console.log("processId " + this.processId);
              this.DataRequiredDocuments = res.filter(x => x.statusId === 1 && x.typeEducationId === this.processId);
              for (const property of this.DataRequiredDocuments) {
                this.FormsEFDocument.addControl(
                  property.documentId.toString(),
                  this.fb.control([], property.typeEducationId == 1 ? [] : [])
                );
              }
            }
        else {
          this.DataRequiredDocuments = res.filter(x => x.statusId === 1);
          for (const property of this.DataRequiredDocuments) {
            this.FormsEFDocument.addControl(
              property.documentId.toString(),
              this.fb.control([], property.typeEducationId == 1 ? [] : [])
            );
          }
        }

      }
    })
  }

 getProcess() {

    this.serviceCallsTeachers.getCallsAvailableById(this.id).subscribe(
      {
        next: (request) => {
          this.processId = request.proceso!;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  verificarCedula(event:any){
  this._teacherService.getExisteCedula(event).subscribe({
      next:(res)=>{
        console.log(res);
        if(res!=null){
          Swal.fire({
            title: "Escuela Judicial",
            text: 'La Cédula ya esta registada en el sistema..',
            icon: "error"
          });
          this.teacherForm.controls['cedula'].setValue('');
        }
      }
    })
  }
  cedulaExist() {
    return (control: FormControl) => {
      const cedula = control.value;

      if (!cedula) {
        return null; // Don't validate empty emails
      }

      return this._teacherService.getExisteCedula(cedula)
    };
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
      this.viewMessag(2);
    });
  }

  viewMessag(tip: number) {
    if (tip == 1) {
      if (this.DataTeacher.listTraining.length == 0) {

        this.viewAlert = true;
      } else {
        this.viewAlert = false;
      }

    } else {
      if (this.DataTeacher.listExperience.length == 0) {
        this.viewAlert1 = true;
      } else {
        this.viewAlert1 = false;
      }

    }

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
      this.viewMessag(1);
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

  valor(event: any) {
    console.log(event);
    console.log(this.teacherForm.value);
  }
  // , [this.cedulaExist()]
  createTeacherForm(): UntypedFormGroup {
    return this.fb.group({
      teacherId: new FormControl(0),
      cedula: [this.DataTeacher.cedula, [Validators.required]],
      name: new FormControl(this.DataTeacher?.name, [Validators.required]),
      lastName: new FormControl(this.DataTeacher?.lastName, [Validators.required]),
      email: new FormControl(this.DataTeacher?.email, [Validators.required, Validators.email]),
      // selected: new FormControl(this.DataTeacher?.selected),
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
      process: new FormControl(4),
      createdBy: new FormControl(this.DataTeacher?.dischargeDate)

    });
  }



  onFileSelected(event: any, idx: number, docId: number) {
    // console.log(event, idx, docId);
    
    this.tmp_files[idx] = (event.target.files[0]);
    console.log('====================================');
    console.log(this.tmp_files);
    console.log('====================================');
    this.tmp_docType[idx] = (docId);
    const formdata = new FormData();
    formdata.append('FileDetails', this.tmp_files[0]);
  }

  // mostrarDialogo(): void {
  //   this.dialogo
  //     .open(DialogoConfirmacionComponent, {
  //       data: `¿Te gusta programar en TypeScript?`
  //     })
  //     .afterClosed()
  //     .subscribe((confirmado: Boolean) => {
  //       if (confirmado) {
  //         alert("¡A mí también!");
  //       } else {
  //         alert("Deberías probarlo, a mí me gusta :)");
  //       }
  //     });
  // }
  
  confirmarIncripcion() {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¿Está seguro de que desea enviar la solicitud? Revise bien la información antes de confirmar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Enviar"
    }).then((result) => {
      if (result.isConfirmed) {
      this.submit();
      } else {
        Swal.fire({
          title: "Escuela Judicial!",
          text: "No fue enviado.",
          icon: "warning"
        });
      }
    });
  }

  submit() {

    this.teacherForm?.get('listDocument')?.setValue(this.DataTeacher?.listDocument);
    this.teacherForm?.get('listExperience')?.setValue(this.DataTeacher?.listExperience);
    this.teacherForm?.get('listTraining')?.setValue(this.DataTeacher?.listTraining);

    if (this.teacherForm.valid) {
      this.load = true;
      const tem = this.tmp_files.filter((element: undefined) => element !== undefined)

      this.teacherForm?.get('process')?.setValue(4);

      this._teacherService.addUpdateTeacher(this.teacherForm.value, this.id, this.type).subscribe({
        next: (res) => {
          const TeacherId = res.idRegistro
          if (TeacherId > 0) {

            for (let i = 0; i < tem.length; i++) {

              if (tem[i] != undefined) {
                const formdata = new FormData();
                formdata.append('FileDetails', tem[i]);
                formdata.append('TeacherId', TeacherId.toString());
                formdata.append('DocTypeId', this.tmp_docType[i]);
                this._teacherService.archivo(formdata).subscribe({
                  next: () => {
                    console.log("guardado");
                    if (i == tem.length - 1) {
                      this.load = false;
                      Swal.fire({
                        title: "Escuela Judicial",
                        text: 'Guardado correctamente.',
                        icon: "success"
                      }).then((result) => {
                        if (result.value) {
                          // Resetear el stepper
                          window.location.reload();
                        }
                      });
                    }

                  },
                  error: () => {

                  }
                })
              }

            }



          }
        },
        error: () => {
          Swal.fire({
            title: "Escuela Judicial",
            text: 'Intente nuevamente.',
            icon: "warning"
          });
        }
      })


      // emppty stuff
    }
  }
  removeTraining(row: Training) {
    this.DataTraining = [];
    this.DataTraining = this.DataTeacher.listTraining.filter(x => x.trainingId != row.trainingId)
    this.DataTeacher.listTraining = [...this.DataTraining]

  }
  base64String: string = '';
  viewDocumento(idx:number) {
  const file=this.tmp_files[idx];
  
  const reader = new FileReader();

  reader.onload = (e) => {
    const base64String = e.target?.result as string;
    // Aquí puedes utilizar base64String, por ejemplo:
    
    this.base64String= base64String.toString();
    // Enviar a un servidor, mostrar una vista previa, etc.
  };
  
  reader.readAsDataURL(file);
  this.base64String = this.base64String.split(",")[1];
    if (this._verificarBS64.transform(this.base64String) != "pdf") {
      const dialogRef = this._dialog.open(ViewPosterComponent, {
        data: {
          type: this._verificarBS64.transform(this.base64String),
          accion: 'view-poster',
          posterFile: this.base64String,
          comment: "",
          poster: this.base64String,
        },
        disableClose: true,
      });
    } else {
      const dialogRef = this._dialog.open(ViewPosterPDFComponent, {
        data: {
          type: this._verificarBS64.transform(this.base64String),
          accion: 'view-poster',
          posterFile: this.base64String,
          comment: "",
          poster: this.base64String,
        },
        width: '1000px',
        disableClose: true,
      });
    }

  }

  volverAtras() {
    this.router.navigate(["calls/teacher-apply-calls"]);
  }


}

