import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { ProductsService } from 'src/app/services/product.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-header-promotion',
  templateUrl: './header-promotion.component.html',
  styleUrls: ['./header-promotion.component.css']
})
export class HeaderPromotionComponent implements OnInit {
  path: String = Path.url;
  category:Object = null;
  top_banner: Object = null;
  preload: boolean = false;
  url:Object = null;
  constructor(private productService : ProductsService) { }

  ngOnInit(): void {
    this.preload = true;
    this.productService.getData().subscribe(resp =>{
       //console.log(resp[Object.keys(resp)[0]]);
        
       /*===========================================
         Tomar la longitud de objeto
        ============================================*/
        let i;
        let size = 0;
        for (i in resp) {
         
          size++; 
        }
        /*===========================================
         Generar un numero aleatorio
        ============================================*/
        let index = Math.floor(Math.random() * size)
        this.category = resp[Object.keys(resp)[index]].category;
        this.top_banner = JSON.parse(resp[Object.keys(resp)[index]].top_banner);
        this.url = resp[Object.keys(resp)[index]].url;
        this.preload = false;
    })
  }

}
