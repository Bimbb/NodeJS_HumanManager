
const siteRouter = require('./site');
const authRouter = require('./auth');

function router(app) {

    app.use('/site', siteRouter);
    app.use('/auth', authRouter)
}


module.exports = router