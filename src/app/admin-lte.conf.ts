export const adminLteConf = {
  skin: 'blue-light',
  // isSidebarLeftCollapsed: false,
  // isSidebarLeftExpandOnOver: false,
  // isSidebarLeftMouseOver: false,
  // isSidebarLeftMini: true,
  // sidebarRightSkin: 'dark',
  // isSidebarRightCollapsed: true,
  // isSidebarRightOverContent: true,
  layout: 'fixed',
  sidebarLeftMenu: [
    {label: 'Controle estoque', separator: true},
    {label: 'Tipos', route: 'tipos', iconClasses: 'fa fa-file'},
    {label: 'Novo Tipo', route: 'tipos/novo', iconClasses: 'fa fa-plus'},

    {label: 'Fornecedores', separator: true},

    {label: 'Fornecedores', route: 'fornecedores', iconClasses: 'fa fa-file'},
    {label: 'Novo Fornecedor', route: 'fornecedores/novo', iconClasses: 'fa fa-plus'},

    {label: 'Controle estoque', separator: true},

    {label: 'Produtos', route: 'produtos', iconClasses: 'fa fa-file'},
    {label: 'Novo Produto', route: 'produtos/novo', iconClasses: 'fa fa-plus'},

    {label: 'Vendas', iconClasses: 'fa fa-shopping-cart', children: [
      {label: 'Efetuar venda', route: '/venda'},
      {label: 'Efetuar venda avulsa', route: '/venda/avulsa'}
    ]}
  ]
};
