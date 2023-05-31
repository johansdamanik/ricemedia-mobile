const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
})

router.use('/posts', require('./postRoutes'))

router.use('/categories', require('./categoryRoutes'))

module.exports = router;