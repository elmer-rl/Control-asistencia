import { Pipe, PipeTransform } from '@angular/core';
import {List} from '../models/lista.model'
import { Usuario } from '../models/usuario.model';
@Pipe({
  name: 'filtro',
  pure: false
})
export class FiltroPipe implements PipeTransform {

  transform(usuarios: Usuario[], activo : boolean = true): Usuario[] {


  return usuarios.filter( usuario => usuario.activo === activo);

  }

}
