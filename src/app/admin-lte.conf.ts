

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
    /** Separador */
    { roles: todasRoles(), label: '', separator: true },

    { /** Link principal para administração */
      roles: todasRoles(),
      label: 'Administração', iconClasses: 'fa fa-cogs', isCollapsed: true, children: [

          { /** SideBar link Produtos */
            roles: ['READ_PRODUTO', 'WRITE_PRODUTO', 'FULL_PRODUTO',],
            label: 'Produtos', route: 'produtos', iconClasses: 'fa fa-list'
          },

          { /** SideBar link Tipos */
            roles: ['READ_PRODUTO', 'WRITE_PRODUTO', 'FULL_PRODUTO',],
            label: 'Tipos', route: 'tipos', iconClasses: 'fa fa-cubes'
          },

          { /** SideBar link Fornecedores */
            roles: ['READ_FORNECEDOR', 'WRITE_FORNECEDOR', 'FULL_FORNECEDOR'],
            label: 'Fornecedores', route: 'fornecedores', iconClasses: 'fa fa-truck'
          },

          { /** SideBar link Clientes */
            roles: ['READ_CLIENTE', 'WRITE_CLIENTE', 'FULL_CLIENTE'],
            label: 'Clientes', route: 'clientes', iconClasses: 'fa fa-vcard-o'
          },

          { /** SideBar link Usuários */
            roles: ['READ_USUARIO', 'WRITE_USUARIO', 'FULL_USUARIO'],
            label: 'Usuários', route: 'usuarios', iconClasses: 'fa fa-user-circle'
          },

      /* #####  */


    /*  {label: 'Novo Tipo', route: 'tipos/novo', iconClasses: 'fa fa-plus'},

      {label: 'Novo Fornecedor', route: 'fornecedores/novo', iconClasses: 'fa fa-plus'},

      {label: 'Novo Produto', route: 'produtos/novo', iconClasses: 'fa fa-plus'},

      {label: 'Novo Usuário', route: 'usuarios/novo', iconClasses: 'fa fa-plus'},*/

        ]
      },

    /** Separador */
    { roles: todasRoles(), label: '-', separator: true},

    { /** Link principal para Vendas */
      roles: ['READ_VENDA', 'WRITE_VENDA', 'FULL_VENDA'],
      label: 'Vendas', iconClasses: 'fa fa-shopping-cart', isActive: true, children: [
        { /** SideBar link Lista de Vendas */
          roles: ['READ_VENDA', 'WRITE_VENDA', 'FULL_VENDA'],
          label: 'Vendas', route: 'vendas', iconClasses: 'fa fa-list'
        },
        { /** SideBar link executador de Vendas */
          roles: ['READ_VENDA', 'WRITE_VENDA', 'FULL_VENDA'],
          label: 'Efetuar venda', route: 'vendas/nova', iconClasses: 'fa fa-money'
        }
    ]}
  ]
};


function todasRoles() {
  return [
    'READ_PRODUTO', 'WRITE_PRODUTO', 'FULL_PRODUTO',
    'READ_CLIENTE', 'WRITE_CLIENTE', 'FULL_CLIENTE',
    'READ_FORNECEDOR', 'WRITE_FORNECEDOR', 'FULL_FORNECEDOR',
    'READ_USUARIO', 'WRITE_USUARIO', 'FULL_USUARIO',
    'READ_VENDA', 'WRITE_VENDA', 'FULL_VENDA'
  ];
}
