import {Component, Inject, ViewChild} from '@angular/core';
import {ResponseMessageMaestra} from "../../admission/models/ResponseMessage";
import {UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Subject, Teacher} from "../models/Teacher";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TeacherService} from "../services/teacher.service";
import {SubjectServiceService} from "../../admission/FormalEducations/Services/subject-service.service";
import {RequiredDocument} from "../models/RequiredDocument";

import {CallsTeachersService} from "../../CallsTeachers/services/calls-teachers.service";
import Swal from "sweetalert2";

export interface DialogData {
  teacher: Teacher;
  accion: string;
}
@Component({
  selector: 'app-add-documents-selected',
  templateUrl: './add-documents-selected.component.html',
  styleUrls: ['./add-documents-selected.component.scss']
})
export class AddDocumentsSelectedComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  displayedColumns: string[] = [
    'id',
    'name',
  ];
  action: string;
  dialogTitle: string = '';
  id_actividad: string = '';
  DataRequiredDocuments: RequiredDocument[] = [];
  FormsEFDocument!: UntypedFormGroup;
  public id: number = 0;
  public type: string | null = null;


  dataSourceSubject: Subject[] = [];
  subjectList = new MatTableDataSource<Subject>(this.dataSourceSubject);
  public IsLoading: boolean = true;
  @ViewChild('paginatorPoster') set paginator(value: MatPaginator) {

    setTimeout(() => {

      this.subjectList.paginator = value;
      this.IsLoading = false;
    }, 3000);
  }

  constructor(
    public dialogRef: MatDialogRef<AddDocumentsSelectedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _teacherService: TeacherService,
    public _subjectServiceService: SubjectServiceService,
    private serviceCallsTeachers: CallsTeachersService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.accion;

    if (this.action === 'add-documents') {
      this.dialogTitle = "Agregar Documentos";
    }
    this.FormsEFDocument = this.fb.group({});
    this.getRequiredDocuments();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subjectList.paginator = this.paginator;
  }


  async getRequiredDocuments() {
    this._teacherService.getRequiredDocument().subscribe({
      next: (res) => {

          this.DataRequiredDocuments = res.filter(x => x.statusId === 1 && !x.isRecord);
          for (const property of this.DataRequiredDocuments) {
            this.FormsEFDocument.addControl(
              property.documentId.toString(),
              this.fb.control([], property.typeEducationId == 1 ? [Validators.required] : [])
            );
          }
        }

    })
  }


  tmp_files: any[50] = [];
  tmp_docType: any[50] = [];
  onFileSelected(event: any, idx: number, docId: number) {

    this.tmp_files[idx] = (event.target.files[0]);
    this.tmp_docType[idx] = (docId);
    const formdata = new FormData();
    formdata.append('FileDetails', this.tmp_files[0]);
  }

  submit() {
    const tem = this.tmp_files.filter((element: undefined) => element !== undefined)
    // AddTeachers
    for (let i = 0; i < tem.length; i++) {

      if (tem[i] != undefined) {
        const formdata = new FormData();
        formdata.append('FileDetails', tem[i]);
        formdata.append('TeacherId', this.data.teacher.teacherId.toString());
        formdata.append('DocTypeId', this.tmp_docType[i]);
        this._teacherService.archivo(formdata).subscribe({
          next: () => {
            console.log("guardado");
            if (i == tem.length - 1) {
              Swal.fire({
                title: "Escuela Judicial",
                text: 'Guardado correctamente.',
                icon: "success"
              }).then((result) => {
                if (result.value) {
                  // Resetear el stepper
                  window.location.reload();
                }
              });
            }

          },
          error: () => {

          }
        })
      }

    }

  }


}
