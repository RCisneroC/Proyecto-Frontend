
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AsignarDocentesComponent } from 'app/admission/activitydetail/forms/asignar-docentes/asignar-docentes.component';
import { ActivityService } from 'app/admission/maestros/services/activity.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Activity } from 'app/admission/models/activity';
import { Teacher } from '../models/Teacher';
import { TeacherService } from '../services/teacher.service';

export interface DialogData {
  teacher: Teacher;
  accion: string;
}
@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})


export class AddActivityComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  displayedColumns: string[] = [
    'id',
    'name',
    'activityModeName',
    'activityTypeName',

  ];
  action: string;
  dialogTitle: string = '';
  AsignarActivitiesForm: UntypedFormGroup;
  id_actividad: string = '';


  dataSourceActivity: Activity[] = [];
  activityList = new MatTableDataSource<Activity>(this.dataSourceActivity);
  public IsLoading: boolean = true;
  @ViewChild('paginatorPoster') set paginator(value: MatPaginator) {

    setTimeout(() => {

      this.activityList.paginator = value;
      this.IsLoading = false;
    }, 3000);
  }

  constructor(
    public dialogRef: MatDialogRef<AsignarDocentesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _teacherService: TeacherService,
    public _activityService: ActivityService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.accion;

    if (this.action === 'add-Activities') {
      this.dialogTitle = "Agregar actividades";
    }
    this.LoadActivities();
    this.AsignarActivitiesForm = this.fb.group({
      teacherId: [data.teacher.teacherId, [Validators.required]],
      activityList: this.fb.array([]),
      Action: 1
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activityList.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.activityList.filter = filterValue.trim().toLowerCase();
  }

  LoadActivities() {
    this._activityService.getAllActivity2().subscribe({
      next: (res: Activity[]) => {
        const interseccion = res.filter(obj1 => !this.data.teacher.listActivity.some(obj2 => obj2.id === obj1.id));
        this.activityList = new MatTableDataSource<Activity>(interseccion);
      }
    });
  }


  submit() {
    // AddTeachers
    this._teacherService.addActivitiesTeacher(this.AsignarActivitiesForm.getRawValue()).subscribe({
      next: (res: any) => {
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Cargado correctamente.';
        this.dialogRef.close(this.ResponseMessage);
      },
      error: (err: any) => {
        this.ResponseMessage.CodError = 500;
        this.ResponseMessage.Message = "Intento Nuevamente.";
        this.dialogRef.close(this.ResponseMessage);
      }
    });
  }
  get checkboxesFormArray(): UntypedFormArray {


    return this.AsignarActivitiesForm.get('activityList') as UntypedFormArray;
  }

  checkboxChange(event: any, checkboxId: any): void {
    if (event.checked) {
      this.checkboxesFormArray.push(this.fb.control(checkboxId.toString()));
    } else {
      const index = this.checkboxesFormArray.controls.findIndex(x => x.value === checkboxId);
      if (index !== -1) {
        this.checkboxesFormArray.removeAt(index);
      }
    }
  }
}