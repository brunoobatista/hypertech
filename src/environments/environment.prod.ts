export const environment = {
  production: true,
  apiUrl: 'http://172.28.0.4:8080',
  tokenWhitelistedDomains: [ 'tendtudo-business-api.herokuapp.com' ],
 //tokenWhitelistedDomains: [ 'localhost:8080' ],
 tokenBlacklistedRoutes: [ '\/oauth\/token'  ]
};
