import { Component, Inject } from '@angular/core';
import { MenuResponse } from '../models/role';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuService } from '../user/service/menu.service';
export interface DialogData {
  action: string;
  menu: MenuResponse;
  parent: number;
  titulo: string;
}

@Component({
  selector: 'app-forms-menu',
  templateUrl: './forms-menu.component.html',
  styleUrls: ['./forms-menu.component.scss']
})
export class FormsMenuComponent {

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public action: string;
  public dialogTitle: string;
  public newMenu: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormsMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _MenuService: MenuService,
    private fb: UntypedFormBuilder
  ) {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = "Crear nuevo Menu";
      this.newMenu = this.createContactForm();
    } else if (this.action === 'submenu') {
      this.dialogTitle = 'Agregar Submenu para el menu (' + data.titulo + ')';
      this.newMenu = this.createContactFormSubmenu();
    } else {
      this.dialogTitle = 'Editar Menu';
      this.newMenu = this.createContactForm();
    }

  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.data.menu.id],
      path: [this.data.menu.path],
      title: [this.data.menu.title, [Validators.required]],
      iconType: [this.data.menu.iconType],
      icon: [this.data.menu.icon, [Validators.required]],
      class: [this.data.menu.class, [Validators.required]],
      groupTitle: [this.data.menu.groupTitle],
      badge: [this.data.menu.badge],
      badgeClass: [this.data.menu.badgeClass],
      parentApplicationMenuId: [this.data.parent],
      statusId: [this.data.menu.statusId]
    });
  }
  createContactFormSubmenu(): UntypedFormGroup {
    return this.fb.group({
      id: [this.data.menu.id],
      path: [this.data.menu.path, [Validators.required]],
      title: [this.data.menu.title, [Validators.required]],
      iconType: [this.data.menu.iconType],
      icon: ['calendar'],
      class: [this.data.menu.class, [Validators.required]],
      groupTitle: [this.data.menu.groupTitle],
      badge: [this.data.menu.badge],
      badgeClass: [this.data.menu.badgeClass],
      parentApplicationMenuId: [this.data.parent],
      statusId: [this.data.menu.statusId]
    });
  }

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    console.log(this.newMenu.getRawValue());
    if (this.action === 'edit') {
      this._MenuService.UpdateMenu(this.newMenu.getRawValue())
        .subscribe({
          next: (res: ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err: any) => {
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
        });

    } else {
      this._MenuService.addMenu(this.newMenu.getRawValue())
        .subscribe({
          next: (res: ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Creado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (err: any) => {
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
        });
    }
  }


}

