import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '@core';
import { Degree } from 'app/admission/FormalEducations/Models/Degree';
import { StudyMode } from 'app/admission/FormalEducations/Models/StudyMode';
import { DegreeService } from 'app/admission/FormalEducations/Services/degree.service';
import { StudyModeService } from 'app/admission/FormalEducations/Services/study-mode.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { UserService } from 'app/security/user/service/user.service';
export interface DialogData {
  action: string;
  degree: Degree;
}
@Component({
  selector: 'app-forms-degree',
  templateUrl: './forms-degree.component.html',
  styleUrls: ['./forms-degree.component.scss']
})
export class FormsDegreeComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public _ListModeStudy: StudyMode[] = [
    {
      description: '',
      id: 0,
      name: '',
      statusId: 0
    }
  ];
  public _ListUser!: User[];
  public action: string;
  public dialogTitle: string;
  public _DegreeModalForms!: UntypedFormGroup;
  public _DegreeModal!: Degree;
  constructor(
    public dialogRef: MatDialogRef<FormsDegreeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _DegreeService: DegreeService,
    private _studyMode: StudyModeService,
    private _user: UserService

  ) {
    console.log(data);
    this.action = data.action;
    if (this.action === 'add') {
      this.dialogTitle = "Nueva Carrera";
      this._DegreeModal = data.degree;
    } else {
      this.dialogTitle = "Editar Carrera";
      this._DegreeModal = data.degree;
    }
    this._DegreeModalForms = this.createContactForm();
    console.log(this._DegreeModalForms);
    
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      statusId: [this.data.degree.statusId, Validators.required],
      id: [this.data.degree.id],
      name: [this.data.degree.name, Validators.required],
      description: [this.data.degree.description, Validators.required],
      graduationProfile: [this.data.degree.graduationProfile, Validators.required],
      admissionProfile: [this.data.degree.admissionProfile, Validators.required],
      generalGoals: [this.data.degree.generalGoals, Validators.required],
      durationInYears: [this.data.degree.durationInYears, Validators.required],
      numOfCredits: [1, Validators.required],
      participationProfile: [this.data.degree.participationProfile.toString(), Validators.required],
      degreeTarget: [this.data.degree.degreeTarget.toString(), Validators.required],
      assignedCoordinatorId: [this.data.degree.assignedCoordinatorId, Validators.required],
      studyModeId: [this.data.degree.studyModeId, Validators.required],
    });
  }

  ngOnInit(): void {
    this.StudyMode();
    this.GetCoordinador();
  }
  submit() {

  }
  // buscar la modalidad.
  StudyMode() {
    this._studyMode.getAllStudyMode2(1).subscribe({
      next: (res) => {
        this._ListModeStudy = res;
        console.log(this._ListModeStudy);
      }
    })
  }
  
  GetCoordinador() {
    //let rol = 'b23d3a5d-571a-45b8-8d8b-22f2a0812cf1';
    this._user.getUserByTutor().subscribe({
      next: (res) => {
        this._ListUser = res;
        console.log(this._ListUser);
      }
    })
  }
  confirmAdd() {
    if (this.action == 'add') {
      this._DegreeService.addDegree(this._DegreeModalForms.getRawValue())
        .subscribe({
          next: (res) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Guardado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = "Intento Nuevamente.";
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    } else {
      this._DegreeService.updateDegree(this._DegreeModalForms.getRawValue())
        .subscribe({
          next: (res) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = "Intento Nuevamente.";
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
