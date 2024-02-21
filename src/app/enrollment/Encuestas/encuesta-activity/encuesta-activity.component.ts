import { Component, ElementRef, Inject } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getStudentsActivityResponse } from 'app/admission/models/AddEFacademicResponse';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { ListQuestins, QuestionSubject } from 'app/enrollment/models/QuestionsSubject';
import Swal from 'sweetalert2';
export interface DialogData {
  activity: getStudentsActivityResponse;
  accion: string;
}
@Component({
  selector: 'app-encuesta-activity',
  templateUrl: './encuesta-activity.component.html',
  styleUrls: ['./encuesta-activity.component.scss']
})
export class EncuestaActivityComponent {
  public _subjectEnrollmentResult!: getStudentsActivityResponse;
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  Id: string = '';
  action: string;
  dialogTitle: string = '';
  id_cronograma: number = 0;
  public subjectSelect: any;
  public makeSurvey: boolean = false;
  public QuestionsSubject: QuestionSubject[] = [
    {
      CapacitacionVirtual: 'Planeación y desarrollo de la actividad académica',
      ListQuestins: [
        {
          id: 1,
          name: 'Los contenidos de esta actividad responden a las necesidades de su cargo.',
        },
        {
          id: 2,
          name: 'El desarrollo de la actividad académica respondió a los contenidos programados.',
        },
        {
          id: 3,
          name: 'El tiempo dedicado fue adecuado.',
        },
        {
          id: 4,
          name: 'Los recursos utilizados(materiales, textos, ayuda tecnológica) contribuyeron al aprendizaje.',
        },
        {
          id: 5,
          name: 'Los conocimientos adquiridos son aplicables a su trabajo.',
        },
        {
          id: 6,
          name: 'La organización de la actividad académica cumplió sus expectativas.',
        },
      ]
    },
    {
      CapacitacionVirtual: 'Dominio de conocimiento',
      ListQuestins: [
        {
          id: 7,
          name: 'Transmitió los conceptos con claridad y precisión.',
        },
        {
          id: 8,
          name: 'Impartió los contenidos con fluidez y elocuencia.',
        },
        {
          id: 9,
          name: 'Fomentó su reflexión frente a los temas planteados.',
        },
        {
          id: 10,
          name: 'Escuchó, atendió y solucionó sus inquietudes relacionadas con la actividad académica.',
        },
        {
          id: 11,
          name: 'Promovió el trabajo en equipo.',
        },
        {
          id: 12,
          name: 'Motivó su participación.',
        }
      ]
    }
  ]
  constructor(
    public dialogRef: MatDialogRef<EncuestaActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ActivityService: ActivityDetailService,
    private fb: UntypedFormBuilder,
    public elm: ElementRef
  ) {
    console.log(this.QuestionsSubject);
    console.log(this.data);
    // Set the defaults
    this.action = data.accion;
    if (this.action === 'encuesta') {
      this.dialogTitle = "ENCUESTA DE SATISFACCIÓN DE ACTIVIDAD ACADÉMICA";
      if (localStorage.getItem('id_participante') != '') {
        this.Id = localStorage.getItem('id_participante') || '';
      }
      this.getEncuesta();
    }
  }

  calificar(row: ListQuestins) {
    const elementText = this.elm.nativeElement.querySelector('#pregunta_' + row.id);
    const button = this.elm.nativeElement.querySelector('#button_' + row.id);


    if (elementText.value != '') {
      if (elementText.value < 0 || elementText.value > 5) {
        Swal.fire({
          title: "Escuela Judicial",
          text: "El valor debe ser entre 1 a 5.",
          icon: "warning"
        });
        return;
      }
      let data = {
        name: '.....',
        description: '.....',
        questionNumber: row.id,
        score: elementText.value,
        questionId: row.id,
        studentId: this.Id,
        teacherCedula: '21324339',
        activityId: this.data.activity.degreeCurriculumDesignId,
      };

      this._ActivityService.SaveEncuesta(data).subscribe({
        next: (res) => {
          Swal.fire({
            title: "Escuela Judicial",
            text: "Calificación Registrada.",
            icon: "success"
          });
          button.disabled = true;
        }
      })
    } else {
      Swal.fire({
        title: "Escuela Judicial",
        text: "Debe ingresar la valoración.",
        icon: "warning"
      });
    }
  }


  volverDisabledFalse() {
    for (let index = 1; index <= 12; index++) {
      const button = this.elm.nativeElement.querySelector('#button_' + index);
      if (button != null) {
        button.disabled = false;
      }
    }
  }

  // EventSelect(event: any) {
  //   let asignaturaSelect: any = this.data.subject.filter(x => x.asignaturaId == event);
  //   this._subjectEnrollmentResult = asignaturaSelect[0];

  //   this.getEncuesta();
  //   console.log(this.makeSurvey);
  // }

  getEncuesta() {
    this._ActivityService.GetEncuestaLista(this.Id, this.data.activity.degreeCurriculumDesignId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.surveys.length < 12) {
          this.makeSurvey = true;
        } else {
          Swal.fire({
            title: "Escuela Judicial",
            text: "La encuesta para esta Actividad ya fue registrada.",
            icon: "warning"
          });
          this.makeSurvey = false;
        }

      },
      complete: () => {
        this.volverDisabledFalse();
      }
    });
  }
}
