import {Component, Inject} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {DetalleAcademico} from "../../../admission/models/DetalleAcademico";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InscriptionService} from "../../../admission/inscription/services/inscription.service";

@Component({
  selector: 'app-info-academica',
  templateUrl: './info-academica.component.html',
  styleUrls: ['./info-academica.component.scss']
})
export class InfoAcademicaComponent {
  public modalityACForm: UntypedFormGroup;
  public modalityAC: DetalleAcademico = {
    educationalLevelId: 0,
    obtainedTitle: "",
    institution: "",
    city: "",
    completionDate: new Date(),
    startDate: new Date(),
    academicInstitutionId: 0
  }
  DetalleAC = {
    cedula: "",
    educationalLevelId: 0,
    obtainedTitle: "",
    institution: "",
    city: "",
    completionDate: "",
    startDate: "",
    academicInstitutionId: 0
  }
  educationlevelList: any;


  constructor(
    public dialogACRef: MatDialogRef<InfoAcademicaComponent>,
    private _inscriptionService: InscriptionService,
    @Inject(MAT_DIALOG_DATA) public data: DetalleAcademico,
    private fb: UntypedFormBuilder
  ) {
    this.modalityACForm = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      educationalLevelId: [this.modalityAC.educationalLevelId, [Validators.required]],
      obtainedTitle: [this.modalityAC.obtainedTitle, [Validators.required]],
      institution: [this.modalityAC.institution, [Validators.required]],
      city: [this.modalityAC.city, [Validators.required]],
      completionDate: [this.modalityAC.completionDate, [Validators.required]],
      startDate: [this.modalityAC.startDate, [Validators.required]],
      academicInstitution: [this.modalityAC.institution],
    });
  }

  submit() {
    // emppty stuff
    this.dialogACRef.close(this.modalityACForm.value);
  }
  onNoClick(): void {
    this.dialogACRef.close();
  }



  getEducationLevel() {
    this._inscriptionService.getEducationLevel().subscribe({
      next: (data) => {
        console.log("Educationlevel loaded", data.educationLevel);
        this.educationlevelList = data.educationLevel;
      }
    })
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getEducationLevel();
  }


}
