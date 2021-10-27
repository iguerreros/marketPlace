import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/product.service';
import { OwlCarouselConfig } from '../../../functions';
import { Path } from '../../../config';
@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {
  path:String = Path.url;	
	banner_home:Array<any> = [];
	category:Array<any> = [];
	url:Array<any> = [];
	render:Boolean = true;
	preload:Boolean = false;
  constructor(private serviceproducto: ProductsService) {

  }

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
        console.log(size);
         if(size > 5){
           index = Math.floor(Math.random() * (size-5))
         }
         this.serviceproducto.getlimitData(Object.keys(response)[index],5).subscribe( resp =>{
  
          let i ;
          for(i in resp){
            this.banner_home.push(JSON.parse(resp[i].horizontal_slider))
            this.category.push(resp[i].category)
            this.url.push(resp[i].url)
  
            this.preload = false;
          }
         
       })
        


    })
  }

  /*=============================================
	Función que nos avisa cuando finaliza el renderizado de Angular
	=============================================*/
	
	callback(){

		if(this.render){

			this.render = false;

			OwlCarouselConfig.fnc()

		}

	}

}
