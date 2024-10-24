import { Component, inject, ViewChild } from '@angular/core';
import { ProductsListComponent } from '../../components/products/products-list/products-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductsFormComponent } from '../../components/products/products-form/products-form.component';
import { ProductsService } from '../../services/product.service';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from '../../interfaces';
import { CategoriesService } from "../../services/categories.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductsListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    ProductsFormComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public productsService: ProductsService = inject(ProductsService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  public categoryService: CategoriesService = inject(CategoriesService);
  @ViewChild('addProductsModal') public addProductsModal: any;
  public fb: FormBuilder = inject(FormBuilder);
  productForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    stock: ['', Validators.required],
    category: ["", Validators.required]
  })

  constructor() {
    this.productsService.search.page = 1;
    this.productsService.getAll();
    this.categoryService.getAll();
  }

  saveProduct(product: IProduct) {
    this.authService.isSuperAdmin() ?  this.productsService.save(product): null;
    this.modalService.closeAll();


  }

  callEdition(product: IProduct) {
    this.productForm.controls['id'].setValue(product.id ? JSON.stringify(product.id) : '');
    this.productForm.controls['name'].setValue(product.name ? JSON.stringify(product.name) : '');
    this.productForm.controls['description'].setValue(product.description ? product.description : '');
    this.productForm.controls['price'].setValue(product.price ? JSON.stringify(product.price) : '');
    this.productForm.controls['stock'].setValue(product.stock ? JSON.stringify(product.stock) : '');
    this.productForm.controls["category"].setValue(
      product.category.id ? JSON.stringify(product.category.id) : ""
    );
    
    this.modalService.displayModal('md', this.addProductsModal);

  }
  
  updateProduct(product: IProduct) {
    this.productsService.update(product);
    this.modalService.closeAll();

  }
}
