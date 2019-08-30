export class Estado {
  id: number;
  nome: string;
  uf: string;
}

export class Cidade {
  id: number;
  nome: string;
  estado = new Estado();
}

export class Endereco {
  endereco: string;
  numero: string;
  complemento: string;
}
