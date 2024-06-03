import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  usuarioLogIn: string = "";
  contrasenaLogIn: string = "";

  nombre: string = "";
  apellido: string = "";
  contrasena: string = "";
  usuario: string = "";
  Rcontrasena: string = "";
  selectedOption: string = "";


  constructor(
    private alertControler:AlertController, 
    private router:Router, 
    private activateroute: ActivatedRoute,) 
    {  
      this.activateroute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation()?.extras?.state) {
          this.nombre = this.router.getCurrentNavigation()?.extras?.state?.['nombre'];
          this.apellido = this.router.getCurrentNavigation()?.extras?.state?.['apellido'];
          this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
          this.contrasena = this.router.getCurrentNavigation()?.extras?.state?.['contrasena'];

          this.Rcontrasena = this.router.getCurrentNavigation()?.extras?.state?.['Rcontrasena'];
          this.selectedOption = this.router.getCurrentNavigation()?.extras?.state?.['selectedOption'];
        }
      });
  }
  
  ngOnInit() {
  }

  login(){
    if (this.usuarioLogIn.toLowerCase() == this.usuario.toLowerCase()  && this.contrasenaLogIn.toLowerCase() == this.contrasena.toLowerCase() ) {
      this.presentAlert('Correcto','Sesión iniciada correctamente');
      let navigationExtras: NavigationExtras = {
        state: {
          nombre: this.nombre,
          apellido: this.apellido,
          usuario: this.usuario,
          contrasena: this.contrasena,

          Rcontrasena: this.Rcontrasena,
          selectedOption: this.selectedOption,
        }
      };
      this.router.navigate(['/formulario'], navigationExtras);
    } else if (this.usuarioLogIn.length > 8 || this.usuarioLogIn.length < 3) {
      this.presentAlert('Error', 'El nombre de usuario no debe ser mayor a 8 caracteres ni menor a 3');
    } else if (this.contrasenaLogIn.length > 4) {
      this.presentAlert('Error', 'La contraseña no debe ser mayor a 4 caracteres');
    } else {
      this.presentAlert('Error', 'Usuario o contraseña incorrectos');
    }
  }
  

  async presentAlert(header: string, mesagge: string){
    const alert = await this.alertControler.create({
      header: header,
      message: mesagge,
      buttons: ['Aceptar']
    });
    await alert.present();

  }

  CrearCuenta(){
    this.router.navigate(['/home']);
  }
}

