import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { DateformatPipe } from '../../pipes/dateformat.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductInterface } from '../../interfaces/product.interface';
import { minDateValidator } from '../../commons/validators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  idProduct = this.route.snapshot.params["id"];
  product?: ProductInterface
  currentDate = new Date()
  dateRelease = new Date()
  dateRevision = new Date(new Date().getFullYear()+1,new Date().getMonth(), new Date().getDate())
  error?:string;
  frmProducto = new FormGroup({
    id: new FormControl("", {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ]
    }),
    name: new FormControl("", {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100)
      ]
    }),
    logo: new FormControl("", {
      validators: [
        Validators.required
      ]
    }),
    description: new FormControl("", {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]
    }),
    date_release: new FormControl(new DateformatPipe().transform(this.dateRelease.toLocaleDateString(),1), {
      validators: [
        Validators.required, minDateValidator
      ]
    }),
    date_revision: new FormControl(new DateformatPipe().transform(this.dateRevision.toLocaleDateString(),1), {
      validators: [
        Validators.required,
      ]
    })
  });

  constructor(
    private productService: ProductService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (!navigation) {
      this.location.back()
    }
    this.product = navigation?.extras.state as ProductInterface;
    if (this.product){
      this.frmProducto.patchValue(
        this.product
      )
      this.frmProducto.controls.id.disable()
    }
  }

  onReset(){
    this.error="";
    if (this.product){
      this.frmProducto.reset();
      this.frmProducto.controls.id.setValue(this.product.id)
    }else{
      this.frmProducto.reset();
    }
  }

  onChangeDateRelease(event: any){
    this.dateRelease = new Date(event.target.value+"T00:00");
    this.dateRevision = this.addYear (this.dateRelease);
    this.frmProducto.controls.date_revision.setValue(new DateformatPipe().transform(this.dateRevision.toLocaleDateString(),1));
  }

  onSave(){
    this.error="";
    this.frmProducto.markAllAsTouched();
    if(this.frmProducto.valid){
      var params = this.frmProducto.value
      this.productService.save(params, this.product?.id).subscribe({
        next: (res) => {
          this.router.navigateByUrl("/")
        },
        error: (e: HttpErrorResponse) => {
          if (e.status === 404){
            this.error = "El registro que desea guardar no existe"
          }else{
            this.error= e.error.message;
          }
        }
      });
    }
  }

  addYear(date: Date){
    return new Date(date.getFullYear()+1,date.getMonth(), date.getDate())
  }


}
