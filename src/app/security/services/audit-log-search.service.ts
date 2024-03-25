import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { AuditLogModel } from '../models/auditLogModel';


@Injectable({
  providedIn: 'root'
})
export class AuditLogSearchService {

  constructor(private httpClient: HttpClient) { }

  GetByFilters(filters: string) {
    const url = `${environment.apiSharedUrl}`;
    return this.httpClient.get<AuditLogModel>(url + "GetAuditLogsBy?" + filters);
  }

}
