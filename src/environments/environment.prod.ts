export const environment = {
  production: true,
  apiUrl: 'http://172.28.0.4:8080',

  tokenWhitelistedDomains: [ new RegExp('/172.28.0.4:8080/') ],
  tokenBlacklistedRoutes: [ new RegExp('/\/oauth\/token/')  ]
};
