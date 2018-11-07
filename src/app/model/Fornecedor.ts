import { Endereco, Cidade } from './Endereco';

export class Fornecedor {
  id: number;
  nome: string;
  nome_fantasia: string;
  cpfOuCnpj: string;
  telefone: string;
  telefone_op: string;
  endereco = new Endereco();
  cidade = new Cidade();
}
