export const environment = {
  production: true,
  apiUrl: 'https://tendtudo-business-api.herokuapp.com',
  tokenWhitelistedDomains: [ /tendtudo-business-api.herokuapp.com/ ],
  tokenBlacklistedRoutes: [ /\/oauth\/token/  ]
};
