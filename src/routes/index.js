
const siteRouter = require('./site');
const authRouter = require('./auth');
const roleRouter = require('./role')
function router(app) {

    app.use('/site', siteRouter);
    app.use('/auth', authRouter)
    app.use('/role', roleRouter)

}


module.exports = router