import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
})
export class Page1Page implements OnInit {

  nombre: string = "";
  apellido: string = "";
  usuario: string = "";
  contrasena: string = "";

  sueldo: number = 0;
  montoObjetivo: number = 0;
  porcentaje: number = 0;
  ahorroMensual: number = 0;
  tiempoParaAlcanzarMeta: number = 0;

  tab: any;

  constructor(
    private router: Router, 
    private activateroute: ActivatedRoute,
    private alertController: AlertController,

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
      }
    });
  }
  
  ngOnInit() {
  }

  updatePercentage(event: any) {
    this.porcentaje = event.detail.value;
  }

  updatePercentageInput(event: any) {
    const value = parseInt(event.target.value, 10);
    if (value >= 0 && value <= 100) {
      this.porcentaje = value;
    } else if (value < 0) {
      this.porcentaje = 0;
    } else if (value > 100) {
      this.porcentaje = 100;
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
    
  AhorroMensual() {
    return this.sueldo * (this.porcentaje / 100);
  }

  TiempoParaAlcanzarMeta() {
    let ahorroMensual = this.AhorroMensual();
    let tiempo = this.montoObjetivo / ahorroMensual;
    return parseFloat(tiempo.toFixed(1));
  }

  crearMeta() {
    const regex = /^[0-9]+$/;
    // Verificar si los campos están llenos
    if (this.sueldo <= 0 || this.montoObjetivo <= 0 || this.porcentaje < 0) {
      return this.presentAlert('Error', 'Por favor, llene todos los campos');
    }

    // Validar con expresiones regulares
    else if (!regex.test(this.sueldo.toString()) || !regex.test(this.montoObjetivo.toString()) || !regex.test(this.porcentaje.toString())) {
      return this.presentAlert('Error', 'Los campos deben contener solo números enteros');
    }
    else {
      let navigationExtras: NavigationExtras = {
        state: {
          nombre: this.nombre,
          apellido: this.apellido,
          usuario: this.usuario,
          contrasena: this.contrasena,
  
          sueldo: this.sueldo,
          montoObjetivo: this.montoObjetivo,
          porcentaje: this.porcentaje,
          ahorroMensual: this.ahorroMensual,
          tiempoParaAlcanzarMeta: this.tiempoParaAlcanzarMeta
        }
      };
      }
      return this.presentAlert('¡Éxito!', 'Meta creada exitosamente');
      }
  }


