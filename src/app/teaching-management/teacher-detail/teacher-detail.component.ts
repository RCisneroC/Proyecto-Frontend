import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { Teacher } from '../models/Teacher';
import { TeacherService } from '../services/teacher.service';


@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent extends UnsubscribeOnDestroyAdapter
implements OnInit{
  
  teacherForm!: UntypedFormGroup;
  processList = [
    { id: 1, name: 'Formación' },
    { id: 2, name: 'Educación continua' },
    { id: 3, name: 'Ambos procesos' }
  ];

  displayedColumnsCourses = [
    'courseId',
    //'name',
    'year',
    'actions'
  ];
DataTeacher!: Teacher;
cedula!:string;
dataCourses!: any;
dataTraining!: any;


  
constructor( private activatedRoute: ActivatedRoute,
public _ActivityService: ActivityDetailService,
public _teacherService: TeacherService,
private _nav:Router,
private fb: UntypedFormBuilder
){
  super();
  this.teacherForm = this.createTeacherForm();
}

  ngOnInit() {
  
     this.activatedRoute.queryParams.subscribe((params) => {
     console.log(params);
      this.DataTeacher = params['data'] ;
     
      this.DataTeacher=this.activatedRoute.snapshot.queryParams["cedula"];
      console.log(this.DataTeacher);
    });
    this.cedula=this.activatedRoute.snapshot.params["cedula"];
   this.getTeacherByCedula();

   
   //this.dataCourses= new MatTableDataSource<Course>([]);
  }
  
  getTeacherByCedula() {
    this._teacherService.getTeacherByCedula(this.cedula).subscribe({
      next: (res) => {
        this.DataTeacher = res;
        this.dataCourses=res.listCourse;
           console.log(this.DataTeacher);
      }
    })
  }
  Regresar(){
    this._nav.navigate(['/teaching-management/teacher-list/']);
  }
  
  createTeacherForm(): UntypedFormGroup{
    return this.fb.group({
      teacherId: new FormControl(0),
      cedula: new FormControl('21324339', [Validators.required]),
      name: new FormControl('Conrado', [Validators.required]),
      lastName: new FormControl('arquer', [Validators.required]),
      applicationDate: new FormControl('2024-01-10T14:06:57.959'),
      selected: new FormControl(true),
      dischargeDate: new FormControl('2024-01-10T14:06:57.959'),
      placeResidence: new FormControl('Guatamare calle 8'),
      jobTitle: new FormControl('Lic.Educacion Integral'),
      graduateDegree: new FormControl('string'),
      professionalExperience: new FormControl('10'),
      teachingExperience: new FormControl('8'),
      listCourse: new FormControl(this.dataCourses),
      listTraining: new FormControl([]),
      listSpecialty: new FormControl([]),
      process: new FormControl(1),
      topics: new FormControl(0)
    });
  }
  
  submit() {
    // emppty stuff
  }
  
  remove(row: Teacher){
  console.log(row);
  }
  
  AddCourses(){
  
  }

}
