import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { List } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// import { Alert } from 'selenium-webdriver';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas :List []; 

  usuarios: Usuario [];


  constructor(public deseos : DeseosService ,
     private alert : AlertController, 
    private route : Router,
    public usuarioService: UsuariosService) {
    // this.listas = this.deseos.listas
    this.usuarios =  this.usuarioService.usuarios
    // console.log('deseos',this.listas);
  }

  async agregar(){


  const alert = await this.alert.create({
    header : 'Nuevo Usuario',
    inputs : [
      {
        name:'nombre',
        type:'text',
        placeholder:'Nombre'
      },
      {
        name:'apellido',
        type:'text',
        placeholder:'Apellidos'
      },
      {
        name:'salario',
        type:'number',
        placeholder:'Salario'
      },
      {
        name:'contrato',
        type:'date',
        placeholder:'Fecha de contrato'
      }
    ],
    buttons : [
      {
        text:'cancelar',
        role:'cancel',
        handler : ()=>{
          console.log('cancelar');
          
        }
      },
      {
        text:'crear',
        handler : (data)=>{
          // console.log(data);

          if (data.nombre.length === 0 || data.apellido.length === 0 && data.salario.length === 0 || data.contrato.length === 0) {
            return;
          }

          // Crear Usuario

          const usuarioId = this.usuarioService.crearUsuario(data.nombre,data.apellido,data.salario,data.contrato);

          this.route.navigateByUrl(`/tabs/tab1/agregar/${usuarioId}`);
          
        }
      }
    ]
  });

  alert.present();

  }

  seleccionado(id){
    this.route.navigateByUrl(`/tabs/tab1/agregar/${id}`)
  }

}
