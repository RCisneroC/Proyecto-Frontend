import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Experience, Teacher, Training } from '../models/Teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { TeacherService } from '../services/teacher.service';
import { MatDialog } from '@angular/material/dialog';
import { AddExperienceComponent } from '../add-experience/add-experience.component';
import { AddTrainingComponent } from '../add-training/add-training.component';
import Swal from 'sweetalert2';
import { RequiredDocument } from '../models/RequiredDocument';
import { MatStepper } from '@angular/material/stepper';



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


DataTeacher!:Teacher;
DataRequiredDocuments:RequiredDocument[]= [];
DataExperience:Experience[]= [];
DataTraining:Training[]= [];
fechaActual!: string;
fechaA: string | undefined;
header!: string;
experience?: Experience;
training?: Training;
_Form_Data = new FormData();

FormsEFDocument!: UntypedFormGroup;
  



@ViewChild('stepper') stepper: MatStepper | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    public _ActivityService: ActivityDetailService,
    public _teacherService: TeacherService,
    public _dialog: MatDialog,
    private _nav: Router,
    private fb: UntypedFormBuilder,
  ) {
    super();

  }


  ngOnInit() {
  
    this.DataTeacher = new Teacher();
    const fechaActual = new Date();
    this.fechaA = fechaActual.toLocaleDateString('es-PA');
    this.teacherForm = this.createTeacherForm();
   
    this.FormsEFDocument = this.fb.group({});
    this.getRequiredDocuments();
   
    this.teacherForm=this.fb.group({
      teacherId :new FormControl(0),
      cedula:['',[Validators.required],[this.cedulaExist()]],
      name:['',[Validators.required]],
      lastName:['',[Validators.required]],
      placeOfBirth:['',[Validators.required]],
      dateOfBirth:['',[Validators.required]],
      placeResidence:['',[Validators.required]],
      email:['',[Validators.required]],
      telephoneNumber:['',[Validators.required]],
      carreraId:[true,[Validators.required]],
      selected: new FormControl(false),
      listCourse: new FormControl([]),
      listTraining: new FormControl([]),
      listSpecialty: new FormControl([]),
      listExperience: new FormControl([]),
      listDocument: new FormControl([]),
      process: new FormControl(1),
      createdBy: new FormControl("")
    })
  }
  
  async getRequiredDocuments() {
    this._teacherService.getRequiredDocument().subscribe({
       next: (res) => {
 
         this.DataRequiredDocuments = res;
        
        for (const property of this.DataRequiredDocuments) {
        
          this.FormsEFDocument.addControl(
            property.documentId.toString(),
            this.fb.control([],property.documentId==1? [Validators.required]:[])
          );
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

    });
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
  

  
  createTeacherForm(): UntypedFormGroup{
    return this.fb.group({
      teacherId: new FormControl(0),
      cedula: [this.DataTeacher.cedula, [Validators.required],[this.cedulaExist()]],
      name: new FormControl(this.DataTeacher?.name, [Validators.required]),
      lastName: new FormControl(this.DataTeacher?.lastName, [Validators.required]),
      email: new FormControl(this.DataTeacher?.email, [Validators.required, Validators.email]),
      // selected: new FormControl(this.DataTeacher?.selected),
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


  tmp_files :any[50] = [];
  tmp_docType :any[50] = [];
  onFileSelected(event: any,idx:number,docId:number) {
 
        this.tmp_files[idx]=(event.target.files[0]);
        this.tmp_docType[idx]=(docId);
  
       const formdata=new FormData();
   
       formdata.append('FileDetails', this.tmp_files[0]);

  }

  submit() {
 

  this.teacherForm?.get('listDocument')?.setValue(this.DataTeacher?.listDocument);
  this.teacherForm?.get('listExperience')?.setValue(this.DataTeacher?.listExperience);
  this.teacherForm?.get('listTraining')?.setValue(this.DataTeacher?.listTraining);
  if(this.teacherForm.valid){
  
 const tem=this.tmp_files.filter((element: undefined) => element !== undefined)
   if(tem.length>1){
   
   if(tem.length==this.DataRequiredDocuments.length){
    this.teacherForm?.get('process')?.setValue(3);
   }else{
    this.teacherForm?.get('process')?.setValue(1);
   }
   }else{
    this.teacherForm?.get('process')?.setValue(2);
   }
   
    
   

  this._teacherService.addUpdateTeacher(this.teacherForm.value).subscribe({
    next: (res) => {
    const TeacherId=res.idRegistro
    if(TeacherId>0){
   
     for (let i = 0; i < tem.length ; i++) {
      const formdata=new FormData();
      if(tem[i]!=undefined){
        formdata.append('FileDetails',tem[i]);
        formdata.append('TeacherId',TeacherId.toString());
        formdata.append('DocTypeId',this.tmp_docType[i]);
       this._teacherService.archivo(formdata).subscribe({
         next: () => {
          console.log("guardado");
         },
         error: () => {
         
         }
       })
      }
  
    }
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
          
       
    } },
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
  removeTraining(row: Training){
    this.DataTraining=[];
    this.DataTraining=this.DataTeacher.listTraining.filter(x=>x.trainingId!=row.trainingId)
    this.DataTeacher.listTraining=[...this.DataTraining]
    
  }


}

