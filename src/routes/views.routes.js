import {Router} from 'express';
import * as controller from '../controllers/product.controllers.js';
import { ensureAuthenticated } from '../middlewares/authMiddleware.js';

const router = Router();


router.get('/realtimeproducts',ensureAuthenticated, controller.getAllProductsControllerHandlebars);


router.get('/', (req, res) => {
    res.render('login'); // Asegúrate de que el nombre del archivo de vista sea 'login.handlebars'
});

router.get('/login', (req, res) => {
    const error = req.query.error ? true : false;
    res.render('login', { error });
  });

router.get('/register', (req, res) => {
    res.render('register'); // Asegúrate de que el nombre del archivo de vista sea 'login.handlebars'
});



export default router;

