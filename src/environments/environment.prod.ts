export const environment = {
  production: true,
  apiUrl: 'https://tendtudo-business-api.herokuapp.com',
  tokenWhitelistedDomains: [ 'tendtudo-business-api.herokuapp.com' ],
 //tokenWhitelistedDomains: [ 'localhost:8080' ],
 tokenBlacklistedRoutes: [ '\/oauth\/token'  ]
};
