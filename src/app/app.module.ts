import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { } from '@angular/common'
import { AppComponent } from './app.component';
import { HearderComponent } from './modules/hearder/hearder.component';
import { FooterComponent } from './modules/footer/footer.component';
import { HeaderMobileComponent } from './modules/header-mobile/header-mobile.component';
import { HeaderPromotionComponent } from './modules/header-promotion/header-promotion.component';
import { NewletterComponent } from './modules/newletter/newletter.component';
import { ProductsService } from './services/product.service';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { SearchComponent } from './pages/search/search.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeBannerComponent } from './pages/home/home-banner/home-banner.component';
import { HomeFeaturesComponent } from './pages/home/home-features/home-features.component';
import { HomePromotionsComponent } from './pages/home/home-promotions/home-promotions.component';



@NgModule({
  declarations: [
    AppComponent,
    HearderComponent,
    FooterComponent,
    HeaderMobileComponent,
    HeaderPromotionComponent,
    NewletterComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    SearchComponent,
    Error404Component,
    HomeBannerComponent,
    HomeFeaturesComponent,
    HomePromotionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
