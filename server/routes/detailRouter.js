const Router = require('express')
const router = new Router();
const detailController = require('../controllers/detailController')

router.post('/', detailController.create);
router.get('/', detailController.getAll);
router.get('/:id', detailController.getOne);
router.put('/:id', detailController.putOne);
router.delete('/:id', detailController.removeOne);


module.exports = router;