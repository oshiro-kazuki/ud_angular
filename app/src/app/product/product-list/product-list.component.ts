import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { products } from '../../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:any = products;

  constructor() { }

  ngOnInit(): void {
  }

}
