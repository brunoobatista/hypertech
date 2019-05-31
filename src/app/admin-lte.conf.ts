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
    {label: '', separator: true},
    {label: 'Administração', iconClasses: 'fa fa-cogs', isCollapsed: true, children: [
      {label: 'Produtos', route: 'produtos', iconClasses: 'fa fa-list'},
      {label: 'Tipos', route: 'tipos', iconClasses: 'fa fa-cubes'},
      {label: 'Fornecedores', route: 'fornecedores', iconClasses: 'fa fa-truck'},
      {label: 'Clientes', route: 'clientes', iconClasses: 'fa fa-user'},

      {label: 'Novo Tipo', route: 'tipos/novo', iconClasses: 'fa fa-plus'},

      {label: 'Novo Fornecedor', route: 'fornecedores/novo', iconClasses: 'fa fa-plus'},

      {label: 'Novo Produto', route: 'produtos/novo', iconClasses: 'fa fa-plus'},

    ]},

    {label: '-', separator: true},

    {label: 'Vendas', iconClasses: 'fa fa-shopping-cart', isActive: true, children: [
      {label: 'Vendas', route: 'vendas', iconClasses: 'fa fa-list'},
      {label: 'Efetuar venda', route: 'vendas/nova', iconClasses: 'fa fa-money'}
    ]}
  ]
};
