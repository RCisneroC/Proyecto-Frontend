import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core/service/auth.service';
import { Product } from 'app/treasury/Models/Product';
import { ProductService } from 'app/treasury/Services/product.service';
export interface DialogData {
  id: string;
  action: string;
  productRequest: Product;
}
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  action: string;
  dialogTitle: string;
  productForm!: UntypedFormGroup;
  productRequest: Product;

 
  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public productService: ProductService,
    private authService: AuthService,
    private fb: UntypedFormBuilder,
    private cb: ChangeDetectorRef
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle ="Editar Producto";
      this.productRequest = data.productRequest;
    } else {
      this.dialogTitle = 'Crear Producto';
      this.productRequest = new Product();
    }

  }
  ngOnInit(): void {
    this.productForm = this.createContactForm();
    console.log("-----")
    console.log(this.productRequest)
   // this.requiredDocumentForm.controls[""].patchValue();
    this.cb.detectChanges();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id:[this.productRequest.id],
      NMarbete: [this.productRequest.nMarbete, [Validators.required]],
      Name: [this.productRequest.name, [Validators.required]],
      Ubicacion: [this.productRequest.ubicacion, [Validators.required]],
      Cantidad: [this.productRequest.cantidad, [Validators.required]],
      Marca: [this.productRequest.marca, [Validators.required]],
      Modelo: [this.productRequest.modelo, [Validators.required]],
      Serie: [this.productRequest.serie, [Validators.required]],
      statusId: [1],
      createdBy: [this.authService.currentUserValue.id],
      modifiedBy:[this.authService.currentUserValue.id],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  public confirmAdd(): void {
    if (this.action != 'edit') {
      this.productService.SaveProduct(this.productForm.getRawValue())
        .subscribe({
          next: () => {
            this.dialogRef.close(1);
          },
          error: () => {
            this.dialogRef.close(0);
          }
        });
    } else {
      this.productService.updateProduct(this.productForm.getRawValue())
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
