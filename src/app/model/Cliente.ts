export enum TipoPessoa {
    FISICA, JURIDICA
}

export class Cliente {
    id: number;
    nome: string;
    email: string;
    username: string;
    password: string;
    tipoPessoa: TipoPessoa;
    cpfCnpj: string;
}
