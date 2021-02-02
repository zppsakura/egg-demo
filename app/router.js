'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/register', controller.user.register);
  router.post('/login', controller.user.login);
  router.get('/getLists', controller.todoLists.getLists);
  router.get('/listDelete', controller.todoLists.listDelete);
};
