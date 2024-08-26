import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/service/auth.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Student } from 'app/enrollment/info-student/models/Student';
import { CategoryJobs } from 'app/Job/Interfaces/CategoryJobs';
import { CategoryJobServiceService } from 'app/Job/Services/category-job-service.service';
import { UserService } from 'app/security/user/service/user.service';

export interface DialogData {
  id: string;
  accion: string;
  request: Student;
}

@Component({
  selector: 'app-form-categories',
  templateUrl: './form-categories.component.html',
  styleUrls: ['./form-categories.component.scss']
})
export class FormCategoriesComponent implements OnInit  {
  public categoriesForm: UntypedFormGroup;
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
constructor(
  public dialogRef: MatDialogRef<FormCategoriesComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData,
  private _categoryJobServiceService:CategoryJobServiceService,
  private _userService:UserService,
  
  private authentService: AuthService,
  private fb: UntypedFormBuilder
){
  this.categoriesForm=this.createForm();
}
  
  toppings = new FormControl('');
  categoriesList: CategoryJobs[] = [];
  ngOnInit() {
    this.getCategorias();
  }
  

getCategorias() {

  this._categoryJobServiceService.getAllCooperating2().subscribe({
    next: (res: CategoryJobs[]) => {
      
      this.categoriesList=res
    },
    error: () => {
    }
  })
}
  createForm(): UntypedFormGroup {
    return this.fb.group({
      id:this.authentService.currentUserValue.id,
      selectedInterestCategoryIds: [[]],
     
    });
  }
  submit(){
  
    
    this._userService.updateCategoriaEstudiante(this.categoriesForm.getRawValue()).subscribe({
      next: (res:any) => {
        
          this.ResponseMessage.CodError = 200;
          this.dialogRef.close(this.ResponseMessage);
      
      },
      error: () => {
      }
    })

  }
  
  onNoClick(){
    this.dialogRef.close();
  }

}
