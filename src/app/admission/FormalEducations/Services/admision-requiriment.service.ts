import { Injectable } from '@angular/core';
import { RequirementAdmision } from '../Models/RequirementAdmision';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment.development';
import { ResponseGenerica } from 'app/admission/models/ResponseMessage';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class AdmisionRequirimentService extends UnsubscribeOnDestroyAdapter {
  public _RequirementAdmision!: RequirementAdmision;
  isTblLoading = true;
  dataChange: BehaviorSubject<RequirementAdmision[]> = new BehaviorSubject<RequirementAdmision[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: RequirementAdmision;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): RequirementAdmision[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllRequirementAdmision(): void {
    this.subs.sink = this.httpClient
      .get<RequirementAdmision[]>(environment.apiEF + 'DegreeAdmissionRequirement/GetAll')
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }
  getAllRequirementAdmisione2(id: string) {
    return this.httpClient
      .get<RequirementAdmision[]>(environment.apiEF + 'Degree/GetPendingDegreeAdmissionRequirementBy?DegreeId=' + id);
  }

  getAllRequirementAdmisioneFiltro(id: any) {
    return this.httpClient
      .get<RequirementAdmision[]>(environment.apiEF + 'DegreeAdmissionRequirement/GetAll?StatusId=' + id);
  }

  addRequirementAdmision(StudyMode: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiEF + 'DegreeAdmissionRequirement/Create', StudyMode);
  }

  updateRequirementAdmision(StudyMode: any) {
    return this.httpClient.put<ResponseGenerica>(environment.apiEF + 'DegreeAdmissionRequirement/Update', StudyMode);
  }

  DeleteRequirementAdmision(Id: number) {
    let data = {
      id: Id
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<ResponseGenerica>(environment.apiEF + 'DegreeAdmissionRequirement/Delete', options);
  }
  addDocumentRequirement(StudyMode: any) {
    return this.httpClient.post<ResponseGenerica>(environment.apiEF + 'Degree/CreateDegreeAdmissionRequirement', StudyMode);
  }

  init_RequirementAdmision() {
    this._RequirementAdmision = {
      description: '',
      id: 0,
      name: '',
      statusId: 0
    }
  }
}
