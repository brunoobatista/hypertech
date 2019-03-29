import { Produto } from './Produto';
import { Usuario } from './Usuario';

export class Venda {
    id: number;
    dataVenda: Date;
    valor: number;
    produtos = new Array<Produto>();
    usuario = new Usuario();

    constructor(idUsuario?, dataVenda?, valor = 0) {
        this.usuario.id = idUsuario;
        this.dataVenda = dataVenda;
        this.valor = valor;
    }

}
