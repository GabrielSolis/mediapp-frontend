import { EspecialidadService } from './../../../_service/especialidad.service';
import { Especialidad } from './../../../_model/especialidad';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-especialidad-edicion',
  templateUrl: './especialidad-edicion.component.html',
  styleUrls: ['./especialidad-edicion.component.css']
})
export class EspecialidadEdicionComponent implements OnInit {

  id: number;
  especialidad: Especialidad;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private especialidadService: EspecialidadService, private route: ActivatedRoute, private router: Router) {
    this.especialidad = new Especialidad();
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl('')
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    if (this.edicion) {
      this.especialidadService.getEspecialidadPorId(this.id).subscribe(data => {
        let id = data.idEspecialidad;
        let nombre = data.nombre;
        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombre': new FormControl(nombre)
        });
      });
    }
  }

  operar() {
    this.especialidad.idEspecialidad = this.form.value['id'];
    this.especialidad.nombre = this.form.value['nombre'];

    if (this.especialidad != null && this.especialidad.idEspecialidad > 0) {
      this.especialidadService.modificar(this.especialidad).subscribe(data => {
        if (data === 1) {
          this.especialidadService.getlistarEspecialidad().subscribe(especialidad => {
            this.especialidadService.especialidadCambio.next(especialidad);
            this.especialidadService.mensaje.next("Se modifico");
          });
        } else {
          this.especialidadService.mensaje.next("No se pudo modificar");
        }
      });
    } else {
      this.especialidadService.registrar(this.especialidad).subscribe(data => {
        if (data === 1) {
          this.especialidadService.getlistarEspecialidad().subscribe(especialidad => {
            this.especialidadService.especialidadCambio.next(especialidad);
            this.especialidadService.mensaje.next("Se registro");
          });
        } else {
          this.especialidadService.mensaje.next("No se pudo registrar");
        }
      });
    }  

    this.router.navigate(['especialidad']);
  }
}
