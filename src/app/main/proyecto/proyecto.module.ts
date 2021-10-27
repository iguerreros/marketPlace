import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ProyectoComponent } from './proyecto.component';
import { ProyectoService } from './proyecto.service';
import { AuthGuardService } from 'src/app/auth-guard.service';



const routes = [
  {
      path     : 'proyecto',
      component: ProyectoComponent,
      resolve  : {
          proyecto: ProyectoService
      },
      canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [ProyectoComponent],
  imports: [
    CommonModule,

    RouterModule.forChild(routes),    
        BrowserModule,      
        MatExpansionModule,
        MatIconModule,                
        MatFormFieldModule,
        MatInputModule,

        BrowserAnimationsModule,
   
  ]
})
export class ProyectoModule { }
