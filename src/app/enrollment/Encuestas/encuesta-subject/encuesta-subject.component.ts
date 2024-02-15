import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { QuestionSubject } from 'app/enrollment/models/QuestionsSubject';
import { Subject } from 'app/admission/FormalEducations/Models/Subject';
import { ListQuestins } from '../../models/QuestionsSubject';
export interface DialogData {
  id: string;
  scheduleActivity: Subject;
  accion: string;
}

@Component({
  selector: 'app-encuesta-subject',
  templateUrl: './encuesta-subject.component.html',
  styleUrls: ['./encuesta-subject.component.scss']
})
export class EncuestaSubjectComponent {

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }

  action: string;
  dialogTitle: string = '';
  id_cronograma: number = 0;

  public QuestionsSubject: QuestionSubject = {
    CapacitacionVirtual: '',
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
    private fb: UntypedFormBuilder
  ) {
    console.log(this.QuestionsSubject);

    // Set the defaults
    this.action = data.accion;

    if (this.action === 'encuesta') {
      this.dialogTitle = "EVALUACIÓN DE SATISFACCIÓN DEL DOCENTE CON LA PLATAFORMA TECNOLÓGICA ";
    }
  }

  Calificar(po: number) {

  }
}
