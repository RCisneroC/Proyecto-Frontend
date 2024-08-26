import { Component, Inject, ViewChild } from '@angular/core';
import { MenuResponse, SubMenu } from '../models/role';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuService } from '../user/service/menu.service';
import Swal from 'sweetalert2';
export interface DialogData {
  action: string;
  menu: MenuResponse
}
@Component({
  selector: 'app-view-menu-modal',
  templateUrl: './view-menu-modal.component.html',
  styleUrls: ['./view-menu-modal.component.scss']
})
export class ViewMenuModalComponent {

  action!: string;
  dialogTitle!: string;
  displayedColumns: string[] = [
    'id',
    'name',
    'accion',
  ];
  Submenu: SubMenu[] = [
    {
      id: 0,
      idMenu: 0,
      name: ''
    }
  ];
  _SubjectResponse: MenuResponse[] = [{
    hasAccessPermission:false,
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
      hasAccessPermission:false,
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
    public dialogRef: MatDialogRef<ViewMenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _MenuService: MenuService
  ) {
    this.IsLoading = false;
    // Set the defaults
    this.action = data.action;
    if (this.action === 'view') {
      this.menuSelect(data.menu.subMenus)
      this.dialogTitle = "Vista de Submenu del Menu: " + data.menu.title;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {

  }
  eliminar(row: MenuResponse) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Eliminara " + row.title,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._MenuService.DeleteMenu(row.id).subscribe({
          next: (res: ResponseGenerica) => {
            console.log('====================================');
            console.log(res);
            console.log('====================================');
            Swal.fire({
              title: "Eliminado!",
              text: row.message,
              icon: "success"
            });
          },
          error: (err: any) => {
            console.log(err);
            Swal.fire({
              title: "Intente nuevamente!",
              text: row.title + " no se pudo eliminar.",
              icon: "warning"
            });
          }
        })
      } else {
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListadoSubMenu.filter = filterValue.trim().toLowerCase();
  }
  menuSelect(data: MenuResponse[]) {
    this.ListadoSubMenu = new MatTableDataSource<MenuResponse>(data);

    this.ListadoSubMenu.paginator = this.paginator;
    this.IsLoading = false;

  }
}

