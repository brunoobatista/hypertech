import { Permissao } from './Permissao';

export class Usuario {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    password: string;
    confirmPassword: string;
    username: string;
    permissoes = new Array<Permissao>();
}
