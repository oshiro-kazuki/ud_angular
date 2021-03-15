import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
// import { products } from '../../products';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:any;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const productObservable = this.productService.getProducts();

    productObservable.subscribe(
      (data) => {
        this.products = data;
        console.log('got value product-list ' + data);
      },
      (err) => {console.error('product-list.error: ' + err); },
      () => {console.log('done');},
    );
    
    // this.products = this.productService.getProducts();
  }

}
