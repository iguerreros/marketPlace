import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'minkalogin-minka-notificacion',
  templateUrl: './minka-notificacion.component.html',
  styleUrls: ['./minka-notificacion.component.css']
})
export class MinkaNotificacionComponent  {
  public confirmMessage: string;
  timeLeft: number = 20;
  interval;
  constructor(
    public dialogRef: MatDialogRef<MinkaNotificacionComponent>
  ){
    
   this.startTimer(); 
  }

  startTimer() {
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.cerrar(true);
        }
      },1000)
  }
  
  cerrar(response){
      this.dialogRef.close(response);
  }


}
