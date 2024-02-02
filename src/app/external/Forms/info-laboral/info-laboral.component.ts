import {Component, Inject} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {DetalleExperiencia} from "../../../admission/models/DetalleExperiencia";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InscriptionService} from "../../../admission/inscription/services/inscription.service";
import {DetalleAcademico} from "../../../admission/models/DetalleAcademico";

@Component({
  selector: 'app-info-laboral',
  templateUrl: './info-laboral.component.html',
  styleUrls: ['./info-laboral.component.scss']
})
export class InfoLaboralComponent {
  public modalityILForm: UntypedFormGroup;
  public modalityIL: DetalleExperiencia = {
    entidad: "",
    position: "",
    cityEmployment: "",
    startDateEmployment: new Date(),
    endDate: new Date(),
    time: ""
  }
  DetalleIL = {
    entidad: "",
    position: "",
    cityEmployment: "",
    startDateEmployment: "",
    endDate: "",
    time: ""
  }

  constructor(
    public dialogILRef: MatDialogRef<InfoLaboralComponent>,
    private _inscriptionService: InscriptionService,
    @Inject(MAT_DIALOG_DATA) public data: DetalleAcademico,
    private fb: UntypedFormBuilder
  ) {
    this.modalityILForm = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      entidad: [this.modalityIL.entidad, [Validators.required]],
      position: [this.modalityIL.position, [Validators.required]],
      cityEmployment: [this.modalityIL.cityEmployment, [Validators.required]],
      startDateEmployment: [this.modalityIL.startDateEmployment, [Validators.required]],
      endDate: [this.modalityIL.endDate, [Validators.required]],
      time: [this.modalityIL.time, [Validators.required]],
    });
  }

  submit() {
    // emppty stuff
    this.dialogILRef.close(this.modalityILForm.value);
  }
  onNoClick(): void {
    this.dialogILRef.close();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }


}
