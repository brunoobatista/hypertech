import { Permissao } from './Permissao';

export class Usuario {
    id: number;
    nome: string;
    email: string;
    password: string;
    username: string;
    permissoes = new Array<Permissao>();
}
