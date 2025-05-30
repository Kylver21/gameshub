import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Juego, Estadisticas } from '../interfaces/juego.interface'; // Corrige aquí: importa también Estadisticas

@Injectable({
  providedIn: 'root'
})
export class JuegosDataService {
  private juegosSubject = new BehaviorSubject<Juego[]>([]);
  public juegos$ = this.juegosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarJuegos();
  }

  private cargarJuegos(): void {
    this.http.get<{ juegos: Juego[] }>('assets/data/juegos.json')
      .subscribe(data => {
        this.juegosSubject.next(data.juegos);
      });
  }

  obtenerJuegos(): Observable<Juego[]> {
    return this.juegos$;
  }

  obtenerJuegoPorId(id: number): Observable<Juego | undefined> {
    return this.juegos$.pipe(
      map(juegos => juegos.find(juego => juego.id === id))
    );
  }

  buscarJuegos(termino: string): Observable<Juego[]> {
    return this.juegos$.pipe(
      map(juegos => juegos.filter(juego =>
        juego.nombre.toLowerCase().includes(termino.toLowerCase()) ||
        juego.desarrollador.toLowerCase().includes(termino.toLowerCase()) ||
        juego.categoria.toLowerCase().includes(termino.toLowerCase())
      ))
    );
  }

  filtrarPorCategoria(categoria: string): Observable<Juego[]> {
    return this.juegos$.pipe(
      map(juegos => juegos.filter(juego =>
        juego.categoria.toLowerCase() === categoria.toLowerCase()
      ))
    );
  }

  filtrarPorPlataforma(plataforma: string): Observable<Juego[]> {
    return this.juegos$.pipe(
      map(juegos => juegos.filter(juego =>
        juego.plataformas.includes(plataforma)
      ))
    );
  }

  filtrarPorPrecio(esGratis: boolean): Observable<Juego[]> {
    return this.juegos$.pipe(
      map(juegos => juegos.filter(juego => juego.esGratis === esGratis))
    );
  }

  filtrarPorRating(minRating: number): Observable<Juego[]> {
    return this.juegos$.pipe(
      map(juegos => juegos.filter(juego => juego.rating >= minRating))
    );
  }

  obtenerJuegosPopulares(limite: number = 6): Observable<Juego[]> {
    return this.juegos$.pipe(
      map(juegos => [...juegos]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limite)
      )
    );
  }

  obtenerJuegosRecientes(limite: number = 4): Observable<Juego[]> {
    return this.juegos$.pipe(
      map(juegos => [...juegos]
        .sort((a, b) => new Date(b.fechaLanzamiento).getTime() - new Date(a.fechaLanzamiento).getTime())
        .slice(0, limite)
      )
    );
  }

  getJuegosPorPrecio(min: number, max: number): Observable<Juego[]> {
    return this.juegos$.pipe(
      map(juegos => juegos.filter(juego => juego.precio >= min && juego.precio <= max))
    );
  }

  getEstadisticas(): Observable<Estadisticas> {
    return this.juegos$.pipe(
      map(juegos => {
        const totalJuegos = juegos.length;
        const juegosGratis = juegos.filter(j => j.esGratis).length;
        const juegosPagoArr = juegos.filter(j => !j.esGratis);
        const juegosPago = juegosPagoArr.length;
        const mejor = juegos.reduce((max, j) => j.rating > (max?.rating ?? 0) ? j : max, null as Juego | null);
        const promedioPrecio = juegosPagoArr.length > 0
          ? juegosPagoArr.reduce((acc, j) => acc + j.precio, 0) / juegosPagoArr.length
          : 0;
        return {
          totalJuegos,
          juegosGratis,
          juegosPago,
          mejorRating: mejor ? { nombre: mejor.nombre, rating: mejor.rating } : null,
          promedioPrecio
        };
      })
    );
  }
}