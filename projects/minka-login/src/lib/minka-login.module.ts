import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MinkaLoginComponent } from './minka-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MinkaLoginService } from './minka-login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MinkaNotificacionComponent } from './minka-notificacion/minka-notificacion.component';
import { MatDialogModule } from '@angular/material/dialog';
const routes: Routes = [
  {
      path     : 'login',
      component: MinkaLoginComponent
  }
];

@NgModule({
  declarations: [MinkaLoginComponent, MinkaNotificacionComponent],
  imports: [
    RouterModule.forChild(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule,
    MatDialogModule,
   
    
  ],
  exports: [ 

    MinkaLoginComponent, 
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule,
    MatDialogModule,
    

  ],
  providers : [
    MinkaLoginService,
  ]
})
export class MinkaLoginModule { }
