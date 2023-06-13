import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fcalendario';
  fechasFestivas: string[] | undefined;
  anoIngresado: number | undefined;
  fechaSeleccionada!: Date;
  respuesta: string | undefined;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  

  validarFechaFestiva() {
    const dia = this.fechaSeleccionada.getDate();
    const mes = this.fechaSeleccionada.getMonth() + 1;
    const año = this.fechaSeleccionada.getFullYear();

    this.http.get('http://localhost:8080/festivos/validar/' + dia + '/' + mes + '/' + año, { responseType: 'text' })
      .subscribe(respuesta => {
        this.mostrarAlerta(respuesta);
      });
  }

  obtenerFechasFestivas() {
    this.http.get<string[]>('http://localhost:8080/festivos/todos/' + this.anoIngresado)
      .subscribe(fechasFestivas => {
        this.fechasFestivas = fechasFestivas;
        const mensaje = 'Fechas obtenidas correctamente:\n';
        const fechas = this.fechasFestivas.map(fecha => '- ' + fecha).join('\n');
        this.mostrarAlerta(mensaje + fechas);
      });
  }
  mostrarAlerta(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
 
}
