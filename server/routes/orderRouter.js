const Router = require('express')
const router = new Router();
const orderController = require('../controllers/orderContoller');


router.post('/', orderController.create);
router.get('/', orderController.getAll);
router.get('/:id', orderController.getOne);
router.put('/:id', orderController.putOne);
router.delete('/:id', orderController.removeOne);

module.exports = router;