import { Component, Input, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { List } from 'src/app/models/lista.model';
import { Alert } from 'selenium-webdriver';
import { AlertController, IonList } from '@ionic/angular';
import { viewClassName } from '@angular/compiler';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {
message:string;
useractive:boolean;

  @ViewChild(IonList, {static:true}) user: IonList;

  // listas :List []; 
  usuarios :Usuario[];

  @Input() terminada  = true;


  constructor(public usuariosService : UsuariosService ,
    private route : Router,private alert : AlertController, ) {
    this.usuarios = this.usuariosService.usuarios
    console.log('deseos',this.usuarios);
  }

  async Uactivo(usuario:Usuario,valor){  
    usuario.activo = valor ;
    this.usuariosService.guardarStorage();
  
    if (valor) {
      this.message =`${usuario.nombre} ahora esta activo`
    }else{
      this.message =`${usuario.nombre} dejo de estar activo`
    }
    
  const alert = await this.alert.create({
    header : this.message,
    buttons : [
      {
        text:'Aceptar',
        role:'cancel',
        handler : ()=>{
          // this.lista.closeSlidingItems();   
        }
      }
    ]
  });
  alert.present();
 
 
  }
  
  seleccionado(id){
    

  if (this.terminada) {
    this.route.navigateByUrl(`/tabs/tab2/agregar/${id}`);
  }else{
    this.route.navigateByUrl(`/tabs/tab1/agregar/${id}`)
  }

  }
  
  async borrar(usuario : Usuario){


  const alert = await this.alert.create({
    header : `Seguro que quieres eliminar a ${usuario.nombre} ${usuario.apellido}` ,
    buttons : [
      {
        text:'cancelar',
        role:'cancel',
        handler : ()=>{
          // this.lista.closeSlidingItems();   
        }
      },
      {
        text:'Borrar',
        handler : ()=>{
          // console.log(data);
         this.usuariosService.borrarUsuario(usuario);
          console.log('borar');
          
        }
      }
    ]
  });
  alert.present();

    // this.usuariosService.borrarUsuario(usuario);
  }

  async editar (usuario:Usuario){
    

  const alert = await this.alert.create({
    header : 'ACTUALIZAR EMPLEADO',
    inputs : [
      {
        name:'nombre',
        type:'text',
        value:usuario.nombre
      },
      {
        name:'apellido',
        type:'text',
        value:usuario.apellido
      },
      {
        name:'salario',
        type:'number',
        value:usuario.salario
      },
      {  
        name:'contrato',
        type:'date',
        value: usuario.fechaContrado
      }
       
    ],
  
    buttons : [
      {
        text:'cancelar',
        role:'cancel',
        handler : ()=>{
          // this.lista.closeSlidingItems();   
        }
      },
      {
        text:'Actualizar',
        handler : (data)=>{
          // console.log(data);

          if (data.nombre.length === 0 || data.apellido.length === 0 && data.salario.length === 0 || data.contrato.length === 0) {
            return;
          }

          // Crear Usuario

          usuario.nombre = data.nombre;
          usuario.apellido = data.apellido;
          usuario.salario = data.salario;
          usuario.fechaContrado= data.contrato;

          this.usuariosService.guardarStorage();
          console.log('usuario actualizado', usuario, usuario.activo);
          

          //  this.usuarios.closeSlidingItems();
            
        }
      }
    ]
  });
  alert.present();
    
  }

}
