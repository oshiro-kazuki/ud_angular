import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product.component';
import { ProductService } from './shared/product.service';
import { AuthGuard } from '../auth/shared/auth.guard';


const routes: Routes = [
  { 
    path: 'products', component: ProductComponent,
    children: [
      { path: '', component: ProductListComponent },
      { path: ':productId', component: ProductDetailComponent, canActivate: [AuthGuard] }
    ]
  },
];

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ProductService
  ],
  bootstrap: []
})
export class ProductModule { }
