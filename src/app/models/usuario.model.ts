
//CREAR UN MODELO DE DATOS QUE SEA IGUAL AL DE LA BASE DE DATOS
export class Usuario{
    //importa el orden
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ){}

}