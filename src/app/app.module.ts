import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MinkaLoginModule } from 'minka-login';
import { ProyectoModule } from './main/proyecto/proyecto.module';
import { AuthGuardService } from './auth-guard.service';
import { AppService } from '../app/app.service'
import { HttpClientModule } from '@angular/common/http';


const appRoutes: Routes = [
  {
      path      : '**',
      redirectTo: 'proyecto'
  }
];

@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MinkaLoginModule,
    ProyectoModule
  

  
  ],
  providers: [
    AppService,
    AuthGuardService
  ],
  exports: [ 
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
