import { Component, OnInit, Inject } from '@angular/core';
import { Signos } from '../../../_model/signos';
import { SignosService } from '../../../_service/signos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogo-eliminar',
  templateUrl: './dialogo-eliminar.component.html',
  styleUrls: ['./dialogo-eliminar.component.css']
})
export class DialogoEliminarComponent implements OnInit {
  public signos : Signos;
  public eliminado : boolean;
  public fecha : string;
  constructor(public service: SignosService ,public dialogRef: MatDialogRef<DialogoEliminarComponent>, @Inject(MAT_DIALOG_DATA) public data: Signos) {
    this.signos = data;
    this.eliminado = false;
    this.fecha = this.signos.fecha.toString().substring(0,10);
    
  }

  ngOnInit() {
    console.log(this.signos);
    //this.fecha = this.signos.fecha.getDate() + "/" + this.signos.fecha.getMonth() + "/" + this.signos.fecha.getFullYear();
  }

  eliminar(){
    this.service.eliminar(this.signos.codigoSignos).subscribe(data =>{
        if(data == 1){
          this.eliminado = true;
        }
        this.dialogRef.close(this.eliminado);
    });
  }
  cancelar(){
    this.dialogRef.close(this.eliminado);
  }

}
