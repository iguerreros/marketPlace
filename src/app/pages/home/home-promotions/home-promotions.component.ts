import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/product.service';
import { Path } from '../../../config';
@Component({
  selector: 'app-home-promotions',
  templateUrl: './home-promotions.component.html'
})
export class HomePromotionsComponent implements OnInit {
  path:String = Path.url;	
  banner_default:Array<any> = [];
  category:Array<any> = [];
	url:Array<any> = [];
	preload:Boolean = false;
  constructor(private serviceproducto: ProductsService) { }

  ngOnInit(): void {

    let index;
    this.preload = true;
    this.serviceproducto.getData().subscribe((response: any) =>{

        /*===========================================
         Tomar la longitud de objeto
        ============================================*/
        let i;
        let size = 0;
        for (i in response) {
         
          size++; 
        }

        /*===========================================
            Generar un numero aleatorio
        ============================================*/

         if(size > 2){
           index = Math.floor(Math.random() * (size-2))
         }
         this.serviceproducto.getlimitData(Object.keys(response)[index],2).subscribe( resp =>{
  
          let i ;
          for(i in resp){
            this.banner_default.push(resp[i].default_banner)
            this.category.push(resp[i].category)
            this.url.push(resp[i].url)
  
            this.preload = false;
          }
         
       })
        
    })
  }

}
