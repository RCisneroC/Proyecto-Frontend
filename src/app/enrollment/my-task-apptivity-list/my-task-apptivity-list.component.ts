import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EnrollmentService} from "../services/enrollment.service";
import {AuthService} from "@core";
import {SubjectListService} from "../../intranet-academic-registration/Services/subject-list.service";
import {subjectEnrollmentResult} from "../../admission/models/AddEFacademicResponse";
import {DataTaskSubject} from "../../intranet-academic-registration/Models/ResponseListTaskSubject";
import {CalendarOptions, EventClickArg} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as moment from "moment/moment";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

interface Event {
  title: string;
  date: string;
  data: DataTaskSubject;
}
@Component({
  selector: 'app-my-task-apptivity-list',
  templateUrl: './my-task-apptivity-list.component.html',
  styleUrls: ['./my-task-apptivity-list.component.scss']
})
export class MyTaskApptivityListComponent implements OnInit {
  id!: string;
  teacherCedula!: string;

  constructor(public activeRouter: ActivatedRoute,
    private _enrollservice: EnrollmentService,
    private authService: AuthService,
    public _SubjectService: SubjectListService,
) {
    this.activeRouter.params.subscribe((params) => {

      this.id = params['id'];
    });

  }
  selectedOption!: number;


  subjectList: subjectEnrollmentResult[] = [];

  tasks: DataTaskSubject[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: 'es',
    // dateClick: (arg) => this.handleDateClick(arg),
    events: [
      { title: "sdsad", date: "2019-04-01" }
    ]
  };

  viewCalendar(valor: any) {

    const data = this.subjectList.filter(x => x.asignaturaId == valor.value)
    this.selectedOption = data[0].asignaturaId;
    this.teacherCedula = data[0].teacherCedula;
    this.getAllTaskSubject();

  }

  ngOnInit(): void {
    this.getInfo();

  }
  getInfo() {
    //tomar degree id del path de la ruta
    this._enrollservice.GetStudentsSubjects(this.id, this.authService.currentUserValue.cedula).subscribe({
      next: (res) => {

        this.subjectList = res.subjectEnrollmentResult;



      }
    })

  }

  getAllTaskSubject() {
    const data = {
      subjectId: this.selectedOption,
      teacherId: this.teacherCedula,

    }
    this._SubjectService.GetTaskSubject(data).subscribe({
      next: (res) => {

        const newData: Event[] = [];
        this.tasks = res.data;

        this.tasks.forEach((item: DataTaskSubject, id: number) => {

          newData[id] = { title: item.title.toLocaleUpperCase(), date: moment(item.finalDate).format("YYYY-MM-DD"), data: item }
        })
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
          },
          weekends: true,
          editable: true,
          selectable: true,
          selectMirror: true,
          dayMaxEvents: true,
          locale: 'es',
          eventClick: this.handleEventClick.bind(this),
          events: newData
        }

      }
    })
  }
  handleEventClick(clickInfo: EventClickArg) {
    this.eventClick(clickInfo);
  }

  eventClick(row: EventClickArg) {
    console.log(row);

  }
}
