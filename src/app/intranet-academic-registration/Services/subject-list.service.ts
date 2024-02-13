import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Subject } from 'app/admission/FormalEducations/Models/Subject';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectListService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  public _Subject!: Subject;
  dataChange: BehaviorSubject<Subject[]> = new BehaviorSubject<Subject[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Subject;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Subject[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllSubject(): void {
    this.subs.sink = this.httpClient
      .get<Subject[]>(environment.apiEF + 'Subject/GetAll')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          console.log(data);

          this.dataChange.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  getAllSubject2(id: any) {
    return this.httpClient
      .get<Subject[]>(environment.apiEF + 'Subject/GetAll?StatusId=' + id);
  }

  init_Subject() {
    this._Subject = {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      number: 0,
      acronym: '',
      code: '',
      numOfCredits: 0,
      numOfHours: 0,
      numOfClasses: 0,
      hasLaboratory: false,
      evaluationCriteria: '',
    }
  }
}
