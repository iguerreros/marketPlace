import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
     {
       path : '', component: HomeComponent
     },
     {
      path : 'products', component: ProductsComponent
    },
    {
      path : 'product', component: ProductsComponent
    },
    {
      path : 'search', component: SearchComponent
    },
    {
      path : '**',  pathMatch: 'full', component: Error404Component
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
