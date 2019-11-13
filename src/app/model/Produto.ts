import { Tipo } from './Tipo';
import { Fornecedor } from './Fornecedor';

export class Produto {
  id: number;
  nome: string;
  estoque: number;
  valor: number;
  tipo = new Tipo();
  fornecedores = new Fornecedor();
}
