import { Component, ElementRef, Inject } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getStudentsActivityResponse } from 'app/admission/models/AddEFacademicResponse';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { ListQuestins, QuestionSubject } from 'app/enrollment/models/QuestionsSubject';
import Swal from 'sweetalert2';
import { TypeSurvey } from '../../models/TypeSurvey';
export interface DialogData {
  activity: getStudentsActivityResponse;
  accion: string;
  typeUser?: string;
  docente?: string;
  id_actividad?: string;
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
  habilitarBoton: boolean = true;
  bloquear: boolean = false;
  dataSend: any;
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
  ];
  public QuestionsSubject_three: QuestionSubject = {
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
  };
  public QuestionsSubject_Two: QuestionSubject[] = [
    {
      CapacitacionVirtual: 'Capacitación virtual - Configuración y desarrollo',
      ListQuestins: [
        {
          id: 1,
          name: 'La plataforma es atractiva, amigable y despierta mi interés.',
        },
        {
          id: 2,
          name: 'La plataforma incluye ejemplos y tutoriales que facilitan el aprendizaje.',
        },
        {
          id: 3,
          name: 'La navegación es sencilla y clara para cumplir los objetivos.',
        },
        {
          id: 4,
          name: 'Las lecturas y dinámicas de aprendizajes de instrucción y prácticas, se vinculan a la temática de capacitación.',
        },
        {
          id: 5,
          name: 'Participaría de otra capacitación en modalidad virtual.',
        }
      ]
    },
    {
      CapacitacionVirtual: 'Tutor virtual - Orientación y seguimiento',
      ListQuestins: [
        {
          id: 6,
          name: 'Proporcionó información sobre el programa de la capacitación virtual y su forma de evaluación.',
        },
        {
          id: 7,
          name: 'Mantuvo al día las calificaciones y corrigió según las rúbricas prediseñadas, señalando la retroalimentación correspondiente.',
        },
        {
          id: 8,
          name: 'Proporcionó seguimiento a la actividad académica mediante mensajes y avisos específicos.',
        },
        {
          id: 9,
          name: 'Se comunica de forma afable en cada comunicado que envía.',
        },
        {
          id: 10,
          name: 'Fomentó mi interacción con los demás estudiantes durante el desarrollo de la actividad académica.',
        },
        {
          id: 11,
          name: 'Estuvo disponible durante el desarrollo de la actividad académica para consultas, sugerencias y opiniones.',
        },
        {
          id: 12,
          name: 'Tomaría otra actividad académica facilitada por el mismo tutor.',
        }
      ]
    },
    {
      CapacitacionVirtual: 'Tutor académico',
      ListQuestins: [
        {
          id: 13,
          name: 'El tutor académico proporcionó información sobre el programa de la capacitación virtual y su forma de evaluación oportunamente.',
        },
        {
          id: 14,
          name: 'Se comunica de forma afable en cada comunicado que envía.',
        },
        {
          id: 15,
          name: 'Estuvo disponible durante el desarrollo de la actividad académica para consultas, sugerencias y opiniones.',
        }
      ]
    },
    {
      CapacitacionVirtual: 'Soporte técnico',
      ListQuestins: [
        {
          id: 16,
          name: 'Estuvo disponible durante el desarrollo de la actividad académica para consultas, sugerencias y opiniones.',
        },
        {
          id: 17,
          name: 'Resolvió de forma oportuna los inconvenientes presentados.',
        }
      ]
    }
  ];
  public _TypeSurvey: TypeSurvey[] = [
    {
      id: 1,
      description: 'Encuesta de Satisfacción',
      modalidad: 'Presencial'
    },
    {
      id: 2,
      description: 'Desempeño de la plataforma y actividad Virtual',
      modalidad: 'Virtual'
    }
    // ,{
    //   id: 3,
    //   description: 'Satisfación del docente con la plataforma tecnólogica.',
    //   modalidad: 'Virtual'
    // }
  ];
  public commetOne: string = '';
  public commetTwo: string = '';
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
      this.dialogTitle = "ENCUESTAS";
      if (localStorage.getItem('id_participante') != '') {
        this.Id = localStorage.getItem('id_participante') || '';
      }

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
      if (this.data.typeUser == 'Profesor') {
        this.dataSend = {
          name: row.name,
          description: row.name,
          questionNumber: row.id,
          score: elementText.value,
          questionId: row.id,
          teacherCedula: this.data.docente,
          activityId: this.data.id_actividad,
          SurveyType: this.subjectSelect
        };
        console.log(this.dataSend);
      } else {
        this.dataSend = {
          name: row.name,
          description: row.name,
          questionNumber: row.id,
          score: elementText.value,
          questionId: row.id,
          studentId: this.Id,
          teacherCedula: this.data.activity.activityTeacher,
          activityId: this.data.activity.acivityId,
          SurveyType: this.subjectSelect
        };
      }


      this.bloquear = true;
      this._ActivityService.SaveEncuesta(this.dataSend).subscribe({
        next: (res) => {
          if (row.id == 8) {
            this.habilitarBoton = false;
          } else if (row.id == 17) {
            this.habilitarBoton = false;
          }
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
  finaliarEncuesta3() {
    Swal.fire({
      title: "Escuela Judicial",
      text: "Encuesta realizada correctamente.",
      icon: "success"
    });
    this.dialogRef.close();
  }
  finaliarEncuestaOne() {
    let data = {
      name: '.....',
      description: '.....',
      comment: this.commetOne,
      studentId: this.Id,
      teacherCedula: '21324339',
      activityId: this.data.activity.acivityId,
    };

    this._ActivityService.SaveComment(data).subscribe({
      next: (res) => {
      },
      complete: () => {
        let dataTwo = {
          name: '.....',
          description: '.....',
          comment: this.commetTwo,
          studentId: this.Id,
          teacherCedula: '21324339',
          activityId: this.data.activity.acivityId,
        };
        this._ActivityService.SaveComment(data).subscribe({
          next: (res) => {
          }, complete: () => {
            Swal.fire({
              title: "Escuela Judicial",
              text: "Calificación Registrada.",
              icon: "success"
            });
            this.dialogRef.close();
          }
        });
      }
    })
  }


  volverDisabledFalse() {
    for (let index = 1; index <= 12; index++) {
      const button = this.elm.nativeElement.querySelector('#button_' + index);
      if (button != null) {
        button.disabled = false;
      }
    }
  }

  EventSelect(event: any) {
    if (this.data.typeUser == 'Profesor') {
      this.makeSurvey = true;
      //verificar si el docente ya la relizo.
      this.getEncuesta(event);
    } else {
      this.getEncuesta(event);
    }
  }

  getEncuesta(type: any) {
    let id_actividad: any = 0;
    if (this.data.activity.acivityId == undefined) {
      id_actividad = this.data.id_actividad;
    } else {
      id_actividad = this.data.activity.acivityId;
    }
    this._ActivityService.GetEncuestaLista(this.Id, id_actividad, type, this.data.docente).subscribe({
      next: (res) => {

        if (res.surveys.length < 12 && type == 1) {
          this.makeSurvey = true;
        } else if (res.surveys.length < 17 && type == 2) {
          this.makeSurvey = true;
        } else if (res.surveys.length < 8 && type == 3) {
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
