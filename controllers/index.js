const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use('/dashboard',dashboardRoutes);
router.use('/api',apiRoutes);
router.use('/',homeRoutes) ;

// This is so if we make a request to any endpoint that doesn't exist, we'll receive a 404 error indicating we have requested an incorrect resource:
router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;