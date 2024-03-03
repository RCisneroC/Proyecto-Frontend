import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu, MenuResponse, Role, SubMenu } from 'app/security/models/role';
import { RoleService } from '../role-list/services/role.service';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SubjectResponse } from 'app/teaching-management/models/Teacher';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  action: string;
  role: Role
}
@Component({
  selector: 'app-forms-asigned-roles',
  templateUrl: './forms-asigned-roles.component.html',
  styleUrls: ['./forms-asigned-roles.component.scss']
})
export class FormsAsignedRolesComponent {

  action: string;
  dialogTitle: string;
  roleForm: UntypedFormGroup;
  role: Role;
  displayedColumns: string[] = [
    'id',
    'name',
  ];
  Submenu: SubMenu[] = [
    {
      id: 0,
      idMenu: 0,
      name: ''
    }
  ];
  _SubjectResponse: MenuResponse[] = [{
    statusId: 0,
    id: 0,
    path: '',
    title: '',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    parentApplicationMenuId: 0,
    subMenus: [{
      statusId: 0,
      id: 0,
      path: '',
      title: '',
      iconType: '',
      icon: '',
      class: '',
      groupTitle: false,
      badge: '',
      badgeClass: '',
      parentApplicationMenuId: 0,
      subMenus: [],
      message: '',
      isError: false,
      statusCode: '',
    }],
    message: '',
    isError: false,
    statusCode: '',
  }]
  ListadoSubMenu = new MatTableDataSource<MenuResponse>(this._SubjectResponse);
  @ViewChild('paginatorPoster') set paginator(value: MatPaginator) {
    this.ListadoSubMenu.paginator = value;
  }
  public IsLoading: boolean = true;
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  constructor(
    public dialogRef: MatDialogRef<FormsAsignedRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public roleService: RoleService,
    private fb: UntypedFormBuilder
  ) {
    this.IsLoading = false;
    // Set the defaults
    this.action = data.action;
    if (this.action === 'nuevo') {
      this.dialogTitle = "Asignar Permisos para el ROL: " + data.role.name;
      this.role = data.role;
      this.buscarMenu();
    } else {
      this.dialogTitle = 'Crear rol';
      //const blankObject = {} as Role;
      this.role = new Role();
    }
    this.roleForm = this.createContactForm();
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      RoleId: [this.data.role.id],
      MenuId: [0, [Validators.required]],
      SubMenuIds: this.fb.array([]),
    });
  }
  buscarMenu() {
    this.roleService.MenuResponseF().subscribe({
      next: (res) => {
        this._SubjectResponse = res;
        console.log(this._SubjectResponse);
      },
      complete: () => {

      }
    })
  }
  submit() {
    // emppty stuff
    console.log('====================================');
    console.log(this.roleForm.getRawValue());
    console.log('====================================');
    this.roleService.addPermisseRol(this.roleForm.getRawValue()).subscribe({
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
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    console.log('====================================');
    console.log(this.roleForm.getRawValue());
    console.log('====================================');
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListadoSubMenu.filter = filterValue.trim().toLowerCase();
  }
  get checkboxesFormArray(): UntypedFormArray {
    return this.roleForm.get('SubMenuIds') as UntypedFormArray;
  }

  checkboxChange(event: any, checkboxId: any): void {
    if (event.checked) {
      this.checkboxesFormArray.push(this.fb.control(checkboxId));
    } else {
      const index = this.checkboxesFormArray.controls.findIndex(x => x.value === checkboxId);
      if (index !== -1) {
        this.checkboxesFormArray.removeAt(index);
      }
    }
  }

  menuSelect(event: any) {
    this.roleForm = this.createContactForm();
    this.roleForm.controls['MenuId'].setValue(event);
    this.roleService.MenuResponseFParentMenuId(event).subscribe({
      next: (res) => {
        this.ListadoSubMenu = new MatTableDataSource<MenuResponse>(res);
        setTimeout(() => {
          this.ListadoSubMenu.paginator = this.paginator;
          this.IsLoading = false;
        }, 3000);
      },
      complete: () => {
      }
    })
  }
}
