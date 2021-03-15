import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { products } from '../../products';
import { ProductService } from '../shared/product.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productObservable = this.productService.getProductById(String(params.get('productId')));
      productObservable.subscribe(
        (data) => {
          this.product = data[0];
          console.log(Object.values(this.product));
        },
        (err) => {console.error('product-detail.error: ' + err); },
        () => {console.log('done');},
      );
    });
    
  }

}
