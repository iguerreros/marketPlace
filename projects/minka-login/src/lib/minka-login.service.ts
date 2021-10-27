import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MinkaNotificacionComponent } from './minka-notificacion/minka-notificacion.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
const DB_ID = '1';
const API_URL = "http://apitest.minka.co/";
const USER_SESSION_KEY = "ACCESS_TOKEN_KEY";
const ACCESS_TOKEN_KEY ="USER_SESSION_KEY";
const API_CERRAR_SESSION = 40;
@Injectable({
  providedIn: 'root'
})
export class MinkaLoginService {

    private userSession: any;
    private accessToken: any;
    confirmDialogRef: MatDialogRef<MinkaNotificacionComponent>;
    intervalor; 
    timeLeft: number = 0;
    interval;
    subscribeTimer: any;
    notificacionMensaje = false;

    constructor(
        public _httpClient: HttpClient,
        public _matDialog: MatDialog,
        private router: Router
    ){
        this.userSession = localStorage.getItem(USER_SESSION_KEY)? JSON.parse(String(localStorage.getItem(USER_SESSION_KEY))) : null;
        this.accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    }

    httpPost (urlEndPoint, params = {}, isFile = false) {
      this.startTimer();
      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.accessToken,
          'app-id': DB_ID
      });

      if(this.userSession){
          headers.append('created_user', this.userSession.usu_id);
      }
  
      return this._httpClient.post(API_URL + urlEndPoint, params, {
          responseType: (isFile)? 'blob' as 'json' : 'json',
          headers
      });    
    }

    httpGet (urlEndPoint) {
    
          const headers = new HttpHeaders({
              'Authorization': 'Bearer ' + this.accessToken,
              'app-id': DB_ID
          });
    
          if(this.userSession){
              headers.append('created_user', this.userSession.usu_id);
          }
    
          return this._httpClient.get(API_URL + urlEndPoint, {headers});
    }
    
    getUserSession(){
          return this.userSession;
    }
    
    setUserSession(user: any){
          this.userSession = user;
    }
    
    setAccessToken(token: string){
          this.accessToken = token;
    }

        /**
           * @author: Ismael Guerreros
           * @param: Contador: si aplica para calcular el tiempo de inactividad del sistema
           * @description: Este metodo tiene una funcionalidad media falta el contador que inicialize desde  cero. 
           * @returns: 
       */
    contadortiempo(){
        var contando = 0;
        this.timeLeft=  50;
        this.clearAlert();
        var contadorInactividad = function(){
           //  console.log(contando);
           if(contando === API_CERRAR_SESSION){
            clearInterval(this.intervalor);
            if(sessionStorage.getItem("USER_SESSION_KEY")){
                sessionStorage.removeItem(ACCESS_TOKEN_KEY);
                sessionStorage.removeItem(USER_SESSION_KEY);
            }else{
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                localStorage.removeItem(USER_SESSION_KEY);
            }
            //this.router.navigate(['login']);
               //this._matSnackBar.open('El sistema se cierra en 20 segundos','Aceptar',{duration: 1000,horizontalPosition:'right',verticalPosition:'bottom'}); 
           }
          contando ++;
    
        }

      this.intervalor = setInterval(contadorInactividad,1000);
    }

    clearAlert() {
      clearTimeout(this.intervalor);
    }

    /*============================================================================================
           FUNCIONES PARA CERRAR SESSION DEL PROYECTO  AUTOR: ISMAEL GUERREROS
    ==============================================================================================*/
    mensajes(){

        this.confirmDialogRef = this._matDialog.open(MinkaNotificacionComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'El sistema se cierra en ';
        this.confirmDialogRef.afterClosed().subscribe(result => {
               if(result == false){
                   this.startTimer();
               }else{
                if(sessionStorage.getItem("USER_SESSION_KEY")){
                    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
                    sessionStorage.removeItem(USER_SESSION_KEY);
                }else{
                    localStorage.removeItem(ACCESS_TOKEN_KEY);
                    localStorage.removeItem(USER_SESSION_KEY);
                }
                this.router.navigate(['login']);
               }
            this.confirmDialogRef = null;
        });
    }

    startTimer() {
        var contador = 1;
        this.pauseTimer();
        this.interval = setInterval(() => {
          if(contador > 0) {
            contador++;
            if(contador == API_CERRAR_SESSION){
                this.pauseTimer();
                this.mensajes();
            }
          } else {
            contador = 0;
          }
        },1000)
    }

    pauseTimer() {
        clearInterval(this.interval);
    }
}
