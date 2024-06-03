import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-page3',
  templateUrl: './page3.page.html',
  styleUrls: ['./page3.page.scss'],
})
export class Page3Page implements OnInit {
  nombre: string = "";
  apellido: string = "";
  usuario: string = "";
  contrasena: string = "";
  titulo: string = '';

  sueldo!: number;
  montoObjetivo!: number;
  porcentaje!: number;
  ahorroMensual!: number;
  tiempoParaAlcanzarMeta!: number;
  montoDisponible!: number; 

  constructor(
    private router: Router,
    private activateroute: ActivatedRoute,
  ) {
    this.activateroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras?.state) {
        this.nombre = this.router.getCurrentNavigation()?.extras?.state?.['nombre'];
        this.apellido = this.router.getCurrentNavigation()?.extras?.state?.['apellido'];
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
        this.contrasena = this.router.getCurrentNavigation()?.extras?.state?.['contrasena'];

        this.sueldo = this.router.getCurrentNavigation()?.extras?.state?.['sueldo'];
        this.montoObjetivo = this.router.getCurrentNavigation()?.extras?.state?.['montoObjetivo'];
        this.porcentaje = this.router.getCurrentNavigation()?.extras?.state?.['porcentaje'];
        
        this.ahorroMensual = this.router.getCurrentNavigation()?.extras?.state?.['ahorroMensual'];
        this.tiempoParaAlcanzarMeta = this.router.getCurrentNavigation()?.extras?.state?.['tiempoParaAlcanzarMeta'];
        this.montoDisponible = this.router.getCurrentNavigation()?.extras?.state?.['montoDisponible'];
      }
    });
  }

  ngOnInit() {
  }
}