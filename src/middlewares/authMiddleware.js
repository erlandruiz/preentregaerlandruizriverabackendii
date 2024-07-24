// middlewares/authMiddleware.js
import passport from 'passport';

export const ensureAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect('/');
    }
    req.user = user;
    next();
  })(req, res, next);
};
