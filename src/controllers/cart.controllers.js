import * as cartService from '../services/cart.services.js';

export const create = async(req, res, next)=>{
    try {
        const newCart = await cartService.create();

        if (!newCart) res.status(404).json({ msg: "Error create cart!" });
        else res.status(201).json(newCart);
        
    } catch (error) {
        next(error.message);
    }
}

export const getAll = async(req, res, next)=>{
    try {
        const carts = await cartService.getAll();
        res.status(200).json(carts);

        
    } catch (error) {
        next(error.message); //SALE EL ERROR EN CONSOLA Y EN EL POSTMAN
        // throw(error) // SOLO SALE EL ERROR EN CONSOLA NO EN EL POSTMAN
        // console.error(error) // Sale error en  consola pero  el POSTMAN SE QUEDA ENVIANDO
    }
}

export const getById = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const cart = await cartService.getById(id);
        if (!cart) res.status(404).json({ msg: "Cart Not found!" });
        else res.status(200).json(cart);
    } catch (error) {
        next(error.message);
    }
}

export const addProductToCart = async(req, res, next)=>{
    try {
        const{cartId, productId} = req.params;
        const addProductToCart = await cartService.addProductToCart(cartId, productId);
        if (!addProductToCart) res.status(404).json({ msg: "Error add product to cart!" });
        else res.status(200).json(addProductToCart);
    } catch (error) {
        next(error.message);
    }
}

export const deleteCart = async(req, res, next)=>{
    try {
        const {cartId}= req.params;
        const deletedCart = await cartService.deleteCart(cartId);
        if (!deletedCart) res.status(404).json({ msg: "Error delete cart!" });
        else res.status(200).json({ msg: `Cart id: ${cartId} deleted` });
        
    } catch (error) {
        next(error.message);
    }
}

export const removeProductFromCart =async (req, res, next)=>{
    try {
        const {cartId, productId} = req.params;
        const removeProductFromcart = await cartService.removeProductFromCart(cartId, productId);
        if (!removeProductFromcart) res.status(404).json({ msg: "Error remove product from cart!" });
        else res.status(200).json({msg: `Product Id: ${productId} was removed`});

    } catch (error) {
        next(error.message);
    }
}

export const udpdateCart = async (req, res, next)=>{
    try {
        const{cartId} = req.params;
        const updateCart = await cartService.updateCart(cartId, req.body);
        if(!updateCart) res.status(404).json({ msg: "Error udating cart!" });
        else res.status(200).json(updateCart);


    } catch (error) {
        next(error.message);
    }
}

export const updateProductQuantitytoCart = async (req, res, next)=>{
    try {
        const{cartId, productId} = req.params;

        const {quantity} = req.body;


        
        const updateProductQuantitytoCart = await cartService.updateProductQuantitytoCart(cartId, productId, quantity);
        if(!updateProductQuantitytoCart) res.status(404).json({ msg: "Error update product quantity to cart!" });
        else res.status(200).json(updateProductQuantitytoCart);
        
    } catch (error) {
        next(error.message); 
    }
 }

 export const removeAllProductsFromCart= async (req, res, next)=>{
    try {
        const{cartId}=req.params;
        const removeAllProductsFromCart = await cartService.removeAllProductsFromCart(cartId);
        if(!removeAllProductsFromCart) res.status(404).json({msg:"Error remove all"});
        else res.status(200).json(removeAllProductsFromCart);
        
    } catch (error) {
        next(error.message);
    }
 }

