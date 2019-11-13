export enum TipoPessoa {
    FISICA = 'Física',
    JURIDICA = 'Jurídica'
}

export class Cliente {
    id: number;
    nome: string;
    email: string;
    password: string;
    confirmPassword: string;
    tipoPessoa: TipoPessoa;
    cpfCnpj: string;
}
