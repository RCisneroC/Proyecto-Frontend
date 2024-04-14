import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { CategoryJobs } from '../Interfaces/CategoryJobs';

@Injectable({
  providedIn: 'root'
})
export class CategoryJobServiceService extends UnsubscribeOnDestroyAdapter {

  public _CategoryJobs: CategoryJobs = {
    statusId: 0,
    id: 0,
    name: '',
    description: '',
  }
  constructor(private httpClient: HttpClient) {
    super();
  }

  init_CategoryJobs() {
    this._CategoryJobs = {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
    }
  }
}
