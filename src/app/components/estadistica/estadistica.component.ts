import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosDataService } from '../../services/juegos-data.service';

@Component({
  selector: 'app-estadistica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.css'
})
export class EstadisticaComponent implements OnInit {
  totalJuegos: number = 0;
  cantidadGratis: number = 0;
  cantidadPago: number = 0;
  mejorJuego: { nombre: string, rating: number } | null = null;
  promedioPrecio: number = 0;

  constructor(private juegosDataService: JuegosDataService) {}

  ngOnInit(): void {
    this.juegosDataService.getEstadisticas().subscribe(stats => {
      this.totalJuegos = stats.totalJuegos;
      this.cantidadGratis = stats.juegosGratis;
      this.cantidadPago = stats.juegosPago;
      this.mejorJuego = stats.mejorRating;
      this.promedioPrecio = stats.promedioPrecio;
    });
  }
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