import {Router} from 'express';

import * as controller from '../controllers/cart.controllers.js';

const router = Router();



router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/:id', controller.getById);
router.post('/:cartId/products/:productId', controller.addProductToCart);
router.delete('/:cartId', controller.deleteCart);
router.delete('/:cartId/products/:productId', controller.removeProductFromCart);
router.put('/:cartId', controller.udpdateCart);
router.put('/:cartId/products/:productId', controller.updateProductQuantitytoCart);
router.delete('/clear/:cartId', controller.removeAllProductsFromCart);


export default router;