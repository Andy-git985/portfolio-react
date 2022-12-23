const authRouter = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

authRouter.get('/login/success', (request, response) => {
  if (request.user) {
    response.status(200).json({
      success: true,
      message: 'successfull',
      user: request.user,
      cookies: request.cookies,
    });
  }
});

// authRouter.get('/login/failed', (request, response) => {
//   response.status(401).json({
//     success: false,
//     message: 'failure',
//   });
// });

// authRouter.get('/logout', (request, response, next) => {
//   request.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     response.redirect(config.CLIENT_URL);
//   });
//   // request.logout();
//   // response.redirect(config.CLIENT_URL);
// });

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google'),
  (request, response) => {
    const user = {
      id: request.user.id,
      displayName: request.user.displayName,
    };
    const token = jwt.sign(
      {
        user,
      },
      process.env.SECRET,
      { expiresIn: 60 * 60 }
    );
    response.cookie('jwt', token);
    response.status(200).redirect(config.CLIENT_URL);
    // response
    //   .status(200)
    //   .send({ token, id: user.id, displayName: user.displayName });
  }
);
// authRouter.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: '/login/failed',
//   }),
//   (request, response) => {
//     console.log('redirected', request.user);
//     const token = jwt.sign(request.user, process.env.SECRET, {
//       expiresIn: 60 * 60,
//     });
//     console.log(token);
//     return response.status(200).send({ token }).redirect(config.CLIENT_URL);
//   }
// );
// authRouter.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     successRedirect: config.CLIENT_URL,
//     failureRedirect: '/login/failed',
//   })
// );

module.exports = authRouter;
