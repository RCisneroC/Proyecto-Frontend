import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { DirectoryService } from '../services/directory.service';
import { Direction } from '@angular/cdk/bidi';
import { ViewHistoryAuditComponent } from './view-history-audit/view-history-audit.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { AuthService, User } from '@core';
export interface FoodNode {
  folderId: number;
  fileId: number;
  folderName: string;
  extension?: string;
  files: FoodNode[];
  folders: FoodNode[];
}

export interface ExampleFlatNode {
  expandable: boolean;
  folderId: number;
  fileId: number;
  folderName: string;
  extension: string | undefined;
  level: number;
}

@Component({
  selector: 'app-audit-list',
  templateUrl: './audit-list.component.html',
  styleUrls: ['./audit-list.component.scss']
})
export class AuditListComponent implements OnInit {
  displayedColumns: string[] = ['folderName', 'createdDate', 'createdBy', 'lastModifiedDate', 'lastModifiedBy', 'changeType', 'extension', 'action'];

  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.folders && node.folders.length >= 0,
      folderName: node.folderName,
      extension: node.extension,
      level: level,
      folderId: node.folderId,
      fileId: node.fileId,
    };
  }


  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level,
      node => node.expandable, node => node.folders);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  valor!: string;
  user: User;

  constructor(
    public _verificarBS64: VerificarBS64Pipe,
    public _dialog: MatDialog,
    public _directoryService:DirectoryService,
    public authenticationService:AuthService
  ) {
    this.user = this.authenticationService.currentUserValue;
  }
  ngOnInit() {

    this.getAllDirectory();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getAllDirectory() {
    this._directoryService.getAllDirectory2(this.user.id).subscribe({
      next: (res:any) => {
      console.log(res);
        this.dataSource.data = res["dataResult"]==null?[]:res["dataResult"];
        //this.dataTask.paginator = this.paginator;

      }
    })
  }

  viewHistory(event: any, act: string) {
    console.log('====================================');
    console.log(event);
    console.log('====================================');
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this._dialog.open(ViewHistoryAuditComponent, {
      data: {
        folder: event,
        action: act

      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.getAllDirectory();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });

  }


}




