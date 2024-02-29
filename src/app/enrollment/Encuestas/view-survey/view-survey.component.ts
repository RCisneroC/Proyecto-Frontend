import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SubjectServiceService } from 'app/admission/FormalEducations/Services/subject-service.service';
import { Score, SurveyResponse } from 'app/enrollment/models/QuestionsSubject';
import { Activity, SubjectResponse } from 'app/teaching-management/models/Teacher';


export interface DialogData {
  activity: Activity;
  subject: SubjectResponse;
  action:string;
  cedula:string;

}
@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.scss']
})
export class ViewSurveyComponent implements OnInit {
  displayedColumns: string[] = ['description','1','2','3','4','5'];
  dataSource = new MatTableDataSource<SurveyResponse>([]);
  noDataMessage:string="No se encontraron resultados."
  dialogTitle!: string;
  scoresData!: Score[];
  
  constructor(
    public dialogRef: MatDialogRef<ViewSurveyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _subjectService: SubjectServiceService,
    private fb: UntypedFormBuilder
  ) {


  }
  ngOnInit(): void {
     if (this.data.action=="A"){
     this.getViewSurveyAct();
     }else{
      this.getViewSurveySub();
     }
     
  }
  
  getViewSurveySub() {
    this._subjectService.viewSurveySub(this.data.subject.periodId,this.data.subject.year,this.data.subject.subjectId,this.data.cedula).subscribe({
      next: (res:any) => {
      if(res.length>0){
        const data=res[0]["questions"];
        data.push(...res[1]["questions"])
        this.dataSource = data;
      }
      }
    });  
}

getViewSurveyAct() {
  this._subjectService.viewSurveyAct(this.data.activity.id,this.data.cedula).subscribe({
    next: (res:any) => {
      if(res.length>0){
      const data=res[0]["questions"]
      data.push(...res[1]["questions"])
      this.dataSource = data;
    }
    }
  });  
}
}
