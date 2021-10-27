import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MinkaLoginService } from './minka-login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
const APP_ID = 4;
const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";
const USER_SESSION_KEY = "USER_SESSION_KEY";
@Component({
  selector: 'minkalib-minka-lib',
  templateUrl  : './minka-login.component.html',
  styles: [`
   
  #login {
        flex-direction: column;
        box-sizing: border-box;
        display: flex;
        width: 100%;
        background: url('/assets/images/backgrounds/background.jpg') no-repeat;
        background-size: cover;
        height: 100vh;
    }

    #login-form-wrapper {
        flex: 1 0 auto;
        padding: 32px;
        flex-direction: column;
        box-sizing: border-box;
        display: flex;
        place-content: center;
        align-items: center;
    }

    #login #login-form-wrapper #login-form {
        width: 384px;
        max-width: 384px;
        padding: 32px;
        text-align: center;
        background: #fff;
        box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
        margin: auto;
    }

    .logo {
                width: 128px;
                margin: 32px auto;
    }

    .title {
                font-size: 20px;
                margin: 16px 0 32px 0;
    }

    form {
                width: 100%;
                text-align: left;
    }
    .mat-form-field {
                    width: 100%;
    }

    .mat-form-field-appearance-outline .mat-form-field-flex{
        border: 1px solid #ddd;
    }

    .mat-checkbox {
                    margin: 0;
    }

    .remember-forgot-password {
                    font-size: 13px;
                    margin-top: 8px;
    }
    .remember-me {
                        margin-bottom: 16px
    }

    .forgot-password {
                        font-size: 13px;
                        font-weight: 600;
                        margin-bottom: 16px
    }
                
    #login #login-form-wrapper #login-form form .submit-button {
        width: 220px;
        margin: 16px auto;
        display: block;
    }
   
            

    .register {
                margin: 32px auto 24px auto;
                font-weight: 600;

    }   
    .register    .text {
                    margin-right: 8px;
    }
            

    .separator {
                font-size: 15px;
                font-weight: 600;
                margin: 24px auto;
                position: relative;
                overflow: hidden;
                width: 100px;
    }
    .separator    .text {
                    display: inline-flex;
                    position: relative;
                    padding: 0 8px;
                    z-index: 9999;}

    .separator   .text&:before,.separator    .text&:after {
                        content: '';
                        display: block;
                        width: 30px;
                        position: absolute;
                        top: 10px;
                        border-top: 1px solid;
   }

    .separator    .text&:before {
                        right: 100%;
    }

    .separator    .text&:after {
                        left: 100%;
    }
                
`
  ],
  encapsulation: ViewEncapsulation.None,
    
})
export class MinkaLoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _minkaService: MinkaLoginService,
    private _router: Router,
    private _matSnackBar: MatSnackBar,
  ) { }

  ngOnInit(): void
  {
      this.loginForm = this._formBuilder.group({
          email   : ['', [Validators.required, Validators.email]],
          password: ['', Validators.required]
      });
  }
  nofityLoginError(): void{

      this._matSnackBar.open(
          'Usuario o contraseña no coinciden.', 
          'Aceptar', 
          {   
              duration: 3500, 
              horizontalPosition:'right', 
              verticalPosition:'bottom'
          }
      );
  }

    onSubmit(){
      // Declaración de variables        
      let token: string;

      let params = {
          'client_id' 	: 2,
          'client_secret' : 'DDcSWbNIYvSJxTB2aVXQ4ekp1dN11BCL8oRLLfQR',
          'grant_type' 	: 'password',
          'username'		: this.loginForm.value.email,
          'password'		: this.loginForm.value.password
      };

      this._minkaService.httpPost('oauth/token', params)
      .subscribe(
          (response: any) => {        
              
              token = response.access_token;
              this._minkaService.setAccessToken(token);
              localStorage.setItem(ACCESS_TOKEN_KEY, token);
              let app_id = APP_ID;
              this._minkaService.httpPost('api/login/usuarioweb', {app_id})
              .subscribe(
                  (responseLogin: any) => {

                      if(responseLogin.Code == "M1"){
                          let usuario = responseLogin.Data.usuario;
                          this._minkaService.setUserSession(usuario);
                          localStorage.setItem(USER_SESSION_KEY, JSON.stringify(usuario));
                          this._router.navigate(['proyecto']);
                      } else {
                          this.nofityLoginError();
                      }
                  },
                  errorLogin => {
                      this.nofityLoginError();
                  }
              );
          },
          error => {
              this.nofityLoginError();
          }
      );
  }

}
