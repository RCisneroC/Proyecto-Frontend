import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu, Role, SubMenu } from 'app/security/models/role';
import { RoleService } from '../role-list/services/role.service';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
export interface DialogData {
  action: string;
  submenu: SubMenu[];
  menu: Menu[];
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
  ListadoSubMenu = new MatTableDataSource<SubMenu>(this.Submenu);
  @ViewChild('paginatorPoster') set paginator(value: MatPaginator) {
    console.log(value);
    setTimeout(() => {
      this.ListadoSubMenu.paginator = value;
      this.IsLoading = false;
    }, 3000);
  }
  public IsLoading: boolean = true;
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
    } else {
      this.dialogTitle = 'Crear rol';
      //const blankObject = {} as Role;
      this.role = new Role();
    }
    this.roleForm = this.createContactForm();
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id_rol: [this.data.role.id],
      id_menu: [this.role.name, [Validators.required]],
      subMenuId: this.fb.array([]),
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListadoSubMenu.filter = filterValue.trim().toLowerCase();
  }
  get checkboxesFormArray(): UntypedFormArray {
    return this.roleForm.get('subMenuId') as UntypedFormArray;
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

    let sub = this.data.submenu.filter(x => x.idMenu == event);
    this.ListadoSubMenu = new MatTableDataSource<SubMenu>(sub);
    this.ListadoSubMenu.paginator = this.paginator;
    this.IsLoading = false;
    console.log(sub);

  }
}
