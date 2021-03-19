import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  // { path: 'detail', component: ProductDetailComponent }
  
];

@NgModule({
  imports: [
    ProductModule,
    AuthModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
