import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeRequest } from 'app/admission/FormalEducations/Models/TypeRequest';
import { TypeRequestService } from 'app/admission/FormalEducations/Services/type-request.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { RequestVariousType } from 'app/intranet-academic-registration/Models/RequestVarious';
import { RequestServicesService } from 'app/intranet-academic-registration/Services/request-services.service';
import { Role } from 'app/security/models/role';
import { RoleService } from 'app/security/role/role-list/services/role.service';


export interface DialogData {
  id:number;
  action: string;
  typeRequest: TypeRequest;
}
@Component({
  selector: 'app-type-request-form',
  templateUrl: './type-request-form.component.html',
  styleUrls: ['./type-request-form.component.scss']
})
export class TypeRequestFormComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public typeRequestForms!: UntypedFormGroup;
  public typeRequest: TypeRequest;
  public RequesttypeList: RequestVariousType[] = [];
  roleList!: Role[];
  constructor(
    public dialogRef: MatDialogRef<TypeRequestFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private typeRequestService: TypeRequestService,
    public RequestVariousService: RequestServicesService,
    private _roleService: RoleService,
  ) {
    console.log(data);
    this.action = data.action;
    if (this.action === 'add') {
      this.dialogTitle = "Nuevo asignación";
      this.typeRequest = new TypeRequest();
    } else {
      this.dialogTitle = "Editar asignación";
      this.typeRequest = data.typeRequest;
    }
    this.typeRequestForms = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.typeRequest.id],
      approvalRole: [this.typeRequest.approvalRole, [Validators.required]],
      requestType: [this.typeRequest.requestType,Validators.required],
      statusId: [this.typeRequest.statusId],
    });
  }
  
  loadrequestType() {
    this.RequestVariousService.GetAllRequestVariousType().subscribe({
      next: (res) => {
   
          this.RequesttypeList = res.data
      
      }
    })
  }
  
  loadRol() {
    this._roleService.getAllRols2().subscribe({
      next: (data) => {
      this.roleList=data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  ngOnInit(): void {
   this.loadrequestType();
   this.loadRol();
  }
  submit() {

  }

  confirmAdd() {
    if (this.action == 'add') {
      this.typeRequestService.addTypeRequest(this.typeRequestForms.getRawValue())
        .subscribe({
          next: (res) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Guardado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = "Intento Nuevamente.";
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    } else {
      this.typeRequestService.updateTypeRequest(this.typeRequestForms.getRawValue())
        .subscribe({
          next: (res) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = "Intento Nuevamente.";
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
}

