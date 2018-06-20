import { Subject } from 'rxjs/Subject';
import { MedicoService } from './../../../_service/medico.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Medico } from './../../../_model/medico';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {

  medico: Medico;  

  constructor( public dialogRef: MatDialogRef<DialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medico,
    private medicoService: MedicoService) { 
   
  }

  ngOnInit() {
    this.medico = new Medico();
    this.medico.idMedico = this.data.idMedico;
    this.medico.nombres = this.data.nombres;
    this.medico.apellidos = this.data.apellidos;
    this.medico.cmp = this.data.cmp;
  }

  operar(){
    
    if(this.medico != null && this.medico.idMedico > 0){
      this.medicoService.modificar(this.medico).subscribe(data => {
        if (data === 1) {
          this.medicoService.getlistarMedicos().subscribe(medicos => {
            this.medicoService.medicosCambio.next(medicos);
            this.medicoService.mensaje.next("Se modifico");
          });
        } else {
          this.medicoService.mensaje.next("No se pudo modificar");
        }
      });
    }else{
      this.medicoService.registrar(this.medico).subscribe(data => {
        if (data === 1) {
          this.medicoService.getlistarMedicos().subscribe(medicos => {
            this.medicoService.medicosCambio.next(medicos);
            this.medicoService.mensaje.next("Se registro");
          });
        } else {
          this.medicoService.mensaje.next("No se pudo registrar");
        }
      });
    }
    this.dialogRef.close();
  }

  cancelar(){
    this.dialogRef.close();
    this.medicoService.mensaje.next('false');
  }

}
