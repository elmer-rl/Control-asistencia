import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

   usuario: Usuario ;
  // nombreItem = '';
  valor :boolean = false;

  constructor(private usuarioService:UsuariosService, private route:ActivatedRoute) {

      const usuarioId = this.route.snapshot.paramMap.get('id');
    
      // console.log('id enviado',usuarioId);
      

      this.usuario = this.usuarioService.obtenerUsuario( usuarioId);

      // console.log('obtenido', this.lista);
      
      
   }

  ngOnInit() {
  }

  activo(usuario:Usuario,valor){  
    usuario.activo = valor ;
    this.usuarioService.guardarStorage();
    console.log('Usuario actualizado', usuario,valor);  
 
  }
  

  // agregarItem(){
  //   if (this.nombreItem.length === 0 ) {
  //     return ;
  //   }

  //   const nuevoItem = new ListaItem( this.nombreItem);

  //   console.log('nuevo item', nuevoItem );
    
  //   this.lista.items.push( nuevoItem );
  //   this.nombreItem = '';
  //   this.deseos.guardarStorage();
  // }
  
  cambioCheck(usuario : Usuario){
   
  //   // console.log(item);
  //   const pendientes = this.usuario.items
  //   .filter(itemsdata => !itemsdata.completado).length;

  //   if (pendientes == 0) {
  //     this.usuario.completada = true;
  //   } else{
  //     this.usuario.terminada = null;
  //     this.usuario.completada =  false;
  //   }
    
  //   // console.log(pendientes);
    
  //   this.deseos.guardarStorage();
    
  // }

  // borrar(i :number){
  //   this.usuario.items.splice(i,1);
  //   this.deseos.guardarStorage();
  // }
  }
}
