import {Component, Inject} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {DetalleAcademico, DetalleAcademicoExt} from "../../../admission/models/DetalleAcademico";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InscriptionService} from "../../../admission/inscription/services/inscription.service";

@Component({
  selector: 'app-info-academica',
  templateUrl: './info-academica.component.html',
  styleUrls: ['./info-academica.component.scss']
})
export class InfoAcademicaComponent {
  public modalityACForm: UntypedFormGroup;
  public modalityAC: DetalleAcademicoExt = {
    obtainedTitle:"",
    institution:"",
    program:"",
    year:0
  }
  DetalleAC = {
    obtainedTitle:"",
    institution:"",
    program:"",
    year:0
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
      obtainedTitle: [this.modalityAC.obtainedTitle, [Validators.required]],
      institution: [this.modalityAC.institution, [Validators.required]],
      program: [this.modalityAC.program, [Validators.required]],
      year: [this.modalityAC.year,[Validators.required]],
    });
  }

  submit() {
    // emppty stuff
    this.dialogACRef.close(this.modalityACForm.value);
  }
  onNoClick(): void {
    this.dialogACRef.close();
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //this.getEducationLevel();
  }


}
