
const siteRouter = require('./site');
const authRouter = require('./auth');
const roleRouter = require('./role')
const blogRouter = require('./blog')
const salaryRouter = require('./salary')
const userRouter = require('./user');
const degreeRouter = require('./degree');
const departmentRouter = require('./department');
const permissiontRouter = require('./permission');

function router(app) {

    app.use('/site', siteRouter);
    app.use('/auth', authRouter)
    app.use('/role', roleRouter)
    app.use('/blog', blogRouter)
    app.use('/salary', salaryRouter)
    app.use('/user', userRouter);
    app.use('/degree', degreeRouter);
    app.use('/department', departmentRouter);
    app.use('/permission', permissiontRouter);


}


module.exports = router