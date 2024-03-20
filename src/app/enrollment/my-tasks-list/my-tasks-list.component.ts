import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the day grid view
import interactionPlugin from '@fullcalendar/interaction'; // Import interaction plugin
import { EnrollmentService } from '../services/enrollment.service';
import { AuthService } from '@core/service/auth.service';
import { subjectEnrollmentResult } from 'app/admission/models/AddEFacademicResponse';
import { SubjectListService } from 'app/intranet-academic-registration/Services/subject-list.service';
import { DataTaskSubject } from 'app/intranet-academic-registration/Models/ResponseListTaskSubject';
import * as moment from 'moment';

interface Event {
  title: string;
  date: string;
}
@Component({
  selector: 'app-my-tasks-list',
  templateUrl: './my-tasks-list.component.html',
  styleUrls: ['./my-tasks-list.component.scss']
})
export class MyTasksListComponent implements OnInit {
  id!: string;
  teacherCedula!: string;

constructor( public activeRouter: ActivatedRoute,
  private _enrollservice: EnrollmentService,
  private authService: AuthService,
  public _SubjectService: SubjectListService,
){
  this.activeRouter.params.subscribe((params) => {

    this.id = params['id'];
  });

}
  selectedOption!:number;

  
  subjectList: subjectEnrollmentResult[] = [];
  
   tasks: DataTaskSubject[] = [];
   calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: 'es',
   // dateClick: (arg) => this.handleDateClick(arg),
    events: [
      { title: "sdsad", date: "2019-04-01"}
    ]
  };
  
  viewCalendar( valor:any){
    
    const data=this.subjectList.filter(x=>x.asignaturaId==valor.value)
    this.selectedOption=data[0].asignaturaId;
    this.teacherCedula=data[0].teacherCedula;
   this.getAllTaskSubject();

  }
  
  ngOnInit():void {
  this.getInfo();

  }
  getInfo() {
    //tomar degree id del path de la ruta
    this._enrollservice.GetStudentsSubjects(this.id,this.authService.currentUserValue.cedula).subscribe({
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
    
          const newData: Event[]=[];
          this.tasks = res.data;

          this.tasks.forEach((item:DataTaskSubject,id:number ) => {
          
          newData[id]={ title: item.title.toLocaleUpperCase(), date: moment(item.finalDate).format("YYYY-MM-DD") }
          
        })
          
        // this.calendarOptions = {
        //   initialView: 'dayGridMonth',
        //   plugins: [dayGridPlugin, interactionPlugin],
        //   locale: 'es',
        //  // dateClick: (arg) => this.handleDateClick(arg),
        //   events: [
        //     { title: "sdsad", date: "2024-03-16"}
        //   ]
        // };
          this.calendarOptions={
              initialView: 'dayGridMonth',
              plugins: [dayGridPlugin, interactionPlugin],
              locale: 'es',
             // dateClick: (arg) => this.handleDateClick(arg),
              events:newData
           // events:newData
            }

      }
    })
  }
}
