import { subjectEnrollmentResult } from './../../../admission/models/AddEFacademicResponse';
import { Component, ElementRef, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { QuestionSubject } from 'app/enrollment/models/QuestionsSubject';
import { Subject } from 'app/admission/FormalEducations/Models/Subject';
import { ListQuestins } from '../../models/QuestionsSubject';
import { SubjectServiceService } from 'app/admission/FormalEducations/Services/subject-service.service';
export interface DialogData {
  id: string;
  subject: subjectEnrollmentResult[];
  action: string;
}

@Component({
  selector: 'app-encuesta-subject',
  templateUrl: './encuesta-subject.component.html',
  styleUrls: ['./encuesta-subject.component.scss']
})
export class EncuestaSubjectComponent {
  public _subjectEnrollmentResult!: subjectEnrollmentResult;
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }

  action: string;
  dialogTitle: string = '';
  id_cronograma: number = 0;
  public subjectSelect: any;
  public makeSurvey: boolean = false;
  public QuestionsSubject: QuestionSubject = {
    CapacitacionVirtual: 'Configuración y desarrollo',
    ListQuestins: [
      {
        id: 1,
        name: 'La navegación por la plataforma virtual ha resultado sencilla y clara.',
      },
      {
        id: 2,
        name: 'La plataforma virtual permite la adecuada integración de recursos educativos y herramientas didácticas.',
      },
      {
        id: 3,
        name: 'El diseño estético del entorno (Tamaño y tipo de letras, colores), facilita la interacción con la plataforma.',
      },
      {
        id: 4,
        name: 'Los tiempos de respuesta de la plataforma virtual (espera para acceder a un vínculo, acceso a diferentes herramientas, etc.) han sido adecuados.',
      },
      {
        id: 5,
        name: 'Las herramientas de comunicación (correo, foro, chat) de la plataforma virtual han resultado de fácil manejo.',
      },
      {
        id: 6,
        name: 'El personal técnico ha atendido oportuna y eficientemente a las sugerencias, demandas y dificultades presentadas durante la ejecución de la actividad académica.',
      },
      {
        id: 7,
        name: 'El personal técnico ha suministrado la capacitación necesaria para el manejo de la plataforma virtual.',
      },
      {
        id: 8,
        name: 'Participaría como docente en otra actividad académica con esta plataforma virtual.',
      }
    ]
  }
  constructor(
    public dialogRef: MatDialogRef<EncuestaSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ActivityService: ActivityDetailService,
    public _SubjectService: SubjectServiceService,
    private fb: UntypedFormBuilder,
    public elm: ElementRef
  ) {
    console.log(this.QuestionsSubject);
    console.log(this.data);

    // Set the defaults
    this.action = data.action;

    if (this.action === 'encuesta') {
      this.dialogTitle = "EVALUACIÓN DE SATISFACCIÓN DEL DOCENTE CON LA PLATAFORMA TECNOLÓGICA ";
    }
  }

  calificar(row: ListQuestins) {
    const elementText = this.elm.nativeElement.querySelector('#pregunta_' + row.id);
    console.log(elementText.value);

  }

  EventSelect(event: any) {
    let asignaturaSelect: any = this.data.subject.filter(x => x.asignaturaId == event);
    console.log('====================================');
    console.log(asignaturaSelect[0]);
    // console.log('====================================');
    // if (asignaturaSelect.length > 0) [
    this._subjectEnrollmentResult = asignaturaSelect[0];
    // ]
    this.getEncuesta();
    console.log(this.makeSurvey);
  }

  getEncuesta() {
    this._SubjectService.getEncuestaLista(this._subjectEnrollmentResult.studentId, this._subjectEnrollmentResult.periodsId, 1, this._subjectEnrollmentResult.asignaturaId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.length == 0) {
          this.makeSurvey = true;
        } else {

          this.makeSurvey = false;
        }

      }
    });
  }


}
