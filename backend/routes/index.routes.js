const router = require('express').Router();

const authApiRoute = require('./api/auth.routes');
const apiFavouritesRouter = require('./api/favorit.routes');

router.use('/api/auth', authApiRoute);
router.use('/api/favorite', apiFavouritesRouter);

module.exports = router;
