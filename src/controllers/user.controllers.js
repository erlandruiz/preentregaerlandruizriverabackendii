
import { createHash } from '../utils/hash.js';
import CartDaoMongoDB from '../daos/mongodb/cart.dao.js';
import * as userService from '../services/user.services.js'

const cartDao = new CartDaoMongoDB();

export const createUser = async(req, res, next)=>{

    const { first_name, last_name, email, age, password ,cart,  role} = req.body;

    
    try {
        if (!first_name || !last_name || !email || !age || !password ||!cart || !role) {
            return res.status(400).json({
              error: "Missing fields",
            });
          }

          const  existsCartId = await cartDao.getById(cart);
          if (!existsCartId) {
            const error = new Error("Cart not found");
            error.statusCode = 404;
            return next(error);
        }
           // Hashear contraseña
    const hashPassword = await createHash(password);

        const newUser = await userService.createUser({
            first_name,
            last_name,
            email,
            age,
            password: hashPassword,
            cart,
            role
          });
          if (!newUser) {
            const error = new Error("Error creating a user!");
            error.statusCode = 400;
            return next(error);
        }

        res.status(201).json(newUser);

        
    } catch (error) {
        next(error);
    }
}

export const getAllUser = async(req, res, next)=>{
    try {
        const users = await userService.getAllUser();
        res.status(200).json(users);

        
    } catch (error) {
        next(error); 
        // next(error.message); //SALE EL ERROR EN CONSOLA Y EN EL POSTMAN
        // throw(error) // SOLO SALE EL ERROR EN CONSOLA NO EN EL POSTMAN
        // console.error(error) // Sale error en  consola pero  el POSTMAN SE QUEDA ENVIANDO
    }
}

export const getUserById = async(req, res, next)=>{
    try {
        const {id} = req.params;

        const user = await userService.getUserById(id);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json(user);
        
    } catch (error) {
        next(error);
    }
}