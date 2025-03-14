import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskManager } from 'app/task-manager/Models/taskModel';
import { TaskManagerService } from 'app/task-manager/Services/task-manager.service';


export interface DialogData {
  id: string;
  action: string;
  taskRequest: TaskManager;
}
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  action: string;
  dialogTitle: string;
  taskForm!: UntypedFormGroup;
  taskRequest: TaskManager;

 
  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public taskManagerService: TaskManagerService,
    private fb: UntypedFormBuilder,
    private cb: ChangeDetectorRef
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle ="Editar tarea";
      this.taskRequest = data.taskRequest;
    } else {
      this.dialogTitle = 'Crear tarea';
      this.taskRequest = new TaskManager();
    }

  }
  ngOnInit(): void {
    this.taskForm = this.createTaskForm();
    this.cb.detectChanges();
  }

  createTaskForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.taskRequest.id],
      title: [this.taskRequest.title, [Validators.required]],
      description: [this.taskRequest.description, [Validators.required]],
      completed: [this.taskRequest.completed, [Validators.required]],
    
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
   filterInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
    
    // Permitir solo dígitos (0-9)
    if (!/[\d]/.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  
  public confirmAdd(): void {
    if (this.action != 'edit') {
      this.taskManagerService.saveTask(this.taskForm.getRawValue())
        .subscribe({
          next: () => {
            this.dialogRef.close(1);
          },
          error: () => {
            this.dialogRef.close(0);
          }
        });
    } else {
      this.taskManagerService.updateTask(this.taskForm.getRawValue())
        .subscribe({
          next: () => {
            this.dialogRef.close(1);
          },
          error: () => {
            this.dialogRef.close(0);
          }
        });
    }
  }
  
  
}
