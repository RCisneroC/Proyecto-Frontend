import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Rooms } from 'app/admission/FormalEducations/Models/Rooms';
import { RoomsService } from 'app/admission/FormalEducations/Services/rooms.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  action: string;
  rooms : Rooms;
}
@Component({
  selector: 'app-forms-rooms',
  templateUrl: './forms-rooms.component.html',
  styleUrls: ['./forms-rooms.component.scss']
})
export class FormsRoomsComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public _RoomsForms!: UntypedFormGroup;
  public _Rooms!: Rooms;
  constructor(
    public dialogRef: MatDialogRef<FormsRoomsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _RoomsService: RoomsService
  ) {
    console.log(data);
    this.action = data.action;
   if (this.action === 'add') {
      this.dialogTitle = "Nuevo Salón";
     this._Rooms = data.rooms;
   } else {
     this.dialogTitle = "Editar Salón";
     this._Rooms = data.rooms;
   }
   this._RoomsForms = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this._Rooms.id],
      name: [this._Rooms.name, [Validators.required]],
      description: [this._Rooms.description],
      statusId: [this._Rooms.statusId, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  submit() {
    
  }

  confirmAdd(){
    if (this.action == 'add') {
      this._RoomsService.addRooms(this._RoomsForms.getRawValue())
        .subscribe({
          next:(res)=>{
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Guardado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err) => {
             this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = err;
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    } else {
       this._RoomsService.updateRooms(this._RoomsForms.getRawValue())
        .subscribe({
          next:(res)=>{
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err) => {
             this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = err;
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    }
  }
  onNoClick(){
this.dialogRef.close();
  }
}
