import { Produto } from './Produto';
import { Usuario } from './Usuario';
import { Cliente } from './Cliente';

export class Venda {
    id: number;
    dataVenda: Date;
    valor: number;
    produtos = new Array<Produto>();
    usuario = new Usuario();
    cliente = new Cliente();
    cliente_id: number;
    observacao: Text;
    status: string;
    desconto: number;

    constructor(idUsuario?, dataVenda?, valor = 0) {
        this.usuario.id = idUsuario;
        this.dataVenda = dataVenda;
        this.valor = valor;
    }

}

export class StatusVenda {
    status = {
        ABERTA: "Em aberto",
        FINALIZADA: "Finalizado",
        CANCELADA: "Cancelado",
        ESTORNADA: "Estornada",
    };
}
