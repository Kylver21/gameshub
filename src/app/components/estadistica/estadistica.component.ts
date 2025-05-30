import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estadistica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.css'
})
export class EstadisticaComponent {


}

/*
Respuestas parte 4.1
1. en el archivo Juego.interface.ts
2. los filtros se manejan en de estado global en filtros.component.ts
3. Se configura en los servicios ya que esta presente tanto como en juegos-data.service.ts y categoria.service.ts
*/
/*
Respuestas parte 4.2
1. Porque el proyecto es Standalone y al tenerlo en true es como si cada componente tu viera su propio modulo
2. Permite mantener un valor actual, compartir datos entre componentes y facilita la creación de una aplicación responsive que reacciona a los cambios en el estado de juego.
*/