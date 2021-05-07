const AccessControl = require('accesscontrol')
const controle = new AccessControl()

controle.grant('assinante')
  .readAny('post', ['id', 'titulo', 'conteudo', 'autor'])
  .readAny('usuario', ['nome'])

controle
  .grant('editor')
  .extend('assinante')
  .createOwn('post')
  .deleteOwn('post')

//controle de acessos;
controle
  .grant('admin')
  .createAny('post')
  .readAny('post')
  .deleteAny('post')
  .readAny('usuario')
  .deleteAny('usuario')

module.exports = controle
