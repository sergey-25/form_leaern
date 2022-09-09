const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const orderRouter = require('./orderRouter');
const detailRouter =require('./detailRouter');

router.use('/user', userRouter);
router.use('/orders', orderRouter);
router.use('/detail', detailRouter);

module.exports = router;