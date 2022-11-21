const authRouter = require('express').Router();
const passport = require('passport');
const config = require('../utils/config');

authRouter.get('/login/success', (request, response) => {
  if (request.user) {
    response.status(200).json({
      success: true,
      message: 'successfull',
      user: request.user,
      // cookies: request.cookies,
    });
  }
});

authRouter.get('/login/failed', (request, response) => {
  response.status(401).json({
    success: false,
    message: 'failure',
  });
});

authRouter.get('/logout', (request, response) => {
  request.logout();
  response.redirect(config.CLIENT_URL);
});

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: config.CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);

module.exports = authRouter;
