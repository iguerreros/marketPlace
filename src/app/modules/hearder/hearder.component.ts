import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';
import { Path } from '../../config';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-hearder',
  templateUrl: './hearder.component.html',
  styleUrls: ['./hearder.component.css']
})
export class HearderComponent implements OnInit {
  path: String = Path.url;
  categories: Object = null;
  arrayTitleList: any = [];
  render:Boolean = true;

  constructor( 
    private categoriaService: CategoriesService,
    private subCategoriesService : SubCategoriesService) { }

  ngOnInit(): void {

    this.categoriaService.getData().subscribe(resp =>{
      this.categories = resp;
      
      let i;
      for(i in resp){
        this.arrayTitleList.push(JSON.parse(resp[i].title_list));
      }

    })
  }
 /*=============================================
	Función que nos avisa cuando finaliza el renderizado de Angular
	=============================================*/
	
	callback(){

		if(this.render){

			this.render = false;
			let arraySubCategories = [];
			
			/*=============================================
			Hacemos un recorrido por la lista de títulos
			=============================================*/

			this.arrayTitleList.forEach(titleList =>{

				/*=============================================
				Separar individualmente los títulos
				=============================================*/

				for(let i = 0; i < titleList.length; i++){

					/*=============================================
					Tomamos la colección de las sub-categorías filtrando con la lista de títulos
					=============================================*/
					
					this.subCategoriesService.getFilterData("title_list", titleList[i])
					.subscribe(resp =>{
						
						arraySubCategories.push(resp);

						/*=============================================
						Hacemos un recorrido por la colección general de subcategorias
						=============================================*/

						let f;
						let g;
						let arrayTitleName = [];

						for(f in arraySubCategories){
							
							/*=============================================
							Hacemos un recorrido por la colección particular de subcategorias
							=============================================*/

							for(g in arraySubCategories[f]){

								/*=============================================
								Creamos un nuevo array de objetos clasificando cada subcategoría con la respectiva lista de título a la que pertenece
								=============================================*/

								arrayTitleName.push({

									"titleList": arraySubCategories[f][g].title_list,
									"subcategory": arraySubCategories[f][g].name,
									"url": arraySubCategories[f][g].url,

								})

							}

						}

						/*=============================================
						Recorremos el array de objetos nuevo para buscar coincidencias con las listas de título
						=============================================*/

						for(f in arrayTitleName){

							if(titleList[i] == arrayTitleName[f].titleList){
								
								/*=============================================
								Imprimir el nombre de subcategoría debajo de el listado correspondiente
								=============================================*/

								$(`[titleList='${titleList[i]}']`).append(

									`<li>
										<a href="products/${arrayTitleName[f].url}">${arrayTitleName[f].subcategory}</a>
									</li>`

								)
						
							}

						}					

					})

				}			

			})
		}

	}

}
