export class Usuario {
    id:number;
    nombre:string;
    apellido:string;
    salario:number;
    fechaContrado:Date;
    activo : boolean;

    constructor(nombre:string, apellido:string, salario:number, contrato:Date ) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.salario = salario;
        this.fechaContrado = contrato;
        this.activo= true;
        this.id = new Date().getTime();
    }
}