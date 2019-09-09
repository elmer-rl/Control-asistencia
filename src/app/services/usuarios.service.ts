import { Injectable } from '@angular/core';
// import { List } from '../models/usuario.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

    usuarios : Usuario[]=[];

    constructor(){
        this.cargarStorage();
    }


    crearUsuario(nombre:string, apellido:string, salario:number, contrato:Date){
        const nuevousuario = new Usuario(nombre, apellido, salario , contrato);
        this.usuarios.push(nuevousuario);
        this.guardarStorage();
   
        return nuevousuario.id;
      }
   
      borrarUsuario(usuario : Usuario){
       const index = this.usuarios.indexOf(usuario); 
       this.usuarios.splice(index,1);
       this.guardarStorage();
      }
     
      obtenerUsuario (id: string |number) {
           
        id = Number(id);
   
        return this.usuarios.find( usuarioData => usuarioData.id  === id ); 
       
   
      }
      guardarStorage(){

        localStorage.setItem('data', JSON.stringify(this.usuarios) )
    
      }

      cargarStorage(){

            if(localStorage.getItem('data')){
              this.usuarios = JSON.parse( localStorage.getItem('data'));
            } else{
              this.usuarios =[];
            }
          
          
  
  
    }
}