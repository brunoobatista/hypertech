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
    {label: 'Novo Tipo', route: 'tipos/novo', iconClasses: 'fa fa-file'},
    {label: 'Produtos', route: 'produtos', iconClasses: 'fa fa-file'},
    {label: 'Novo Produto', route: 'produtos/novo', iconClasses: 'fa fa-plus'},

  ]
};
