import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB {
  async create() {
    try {
      const newCart = CartModel({ products: [] });
      return await newCart.save();
    } catch (error) {
      console.error("Error al crear el carrito vacío:", error);
      throw error;
    }
  }
  async getAll() {
    try {
      const carts = await CartModel.find({});
      return carts;
    } catch (error) {
      console.error("Error retrieving all carts:", error);
      throw error;
    }
  }

  async getById(cartId) {
    try {
      const cart = await CartModel.findById(cartId).populate('products.product');
      if (!cart) {
        throw new Error('Cart not found');
      }
      return cart;
    } catch (error) {
      console.error('Error retrieving cart by ID:', error);
      throw error;
    }
  }

  async existsProductInCart(cartId, productId){
    try {
        return await CartModel.findOne({
            _id: cartId,
            products: { $elemMatch: { product: productId } }
          });
        
    } catch (error) {
        // console.error("Error retrieving all carts:", error);
      throw error;
    }
  }
  async addProductToCart(cartId, productId){

    try {
        const exists = await this.existsProductInCart(cartId, productId);

        if(exists){
            return await CartModel.findOneAndUpdate(
                { _id: cartId, 'products.product': productId },
                { $set: { 'products.$.quantity': exists.products[0].quantity + 1 } },
                { new: true }
              );

        } else{
            return await CartModel.findByIdAndUpdate(
                cartId,
                { $push: { products: { product: productId } } },
                { new: true }
              )
        }

        
    } catch (error) {
        throw error;
    }
  }

  async deleteCart(cartId){
    try {

        const deletedCart = await CartModel.findByIdAndDelete(cartId);

    
        return deletedCart
        
    } catch (error) {
        console.error('Error deleting a card:', error);
        throw error;
    }
  }

  async removeProductFromCart(cartId, productId){
    try {
      const updatedCart = await CartModel.findByIdAndUpdate(
        cartId,
        { $pull: { products: { product: productId } } },
        { new: true }
      );

      return updatedCart;
    } catch (error) {
      console.error('Error removing product from cart:', error);
      throw error;
      
    }
  }

  async updateCart (cartId, obj){
    try {
      const updateCart = await CartModel.findByIdAndUpdate(cartId, obj, {new: true});
      return updateCart;
    } catch (error) {
      console.error('Error updating  cart:', error);
      throw error;
    }
  }

  async updateProductQuantitytoCart(cartId, productId, quantity){
    try {
      const updateCart = await CartModel.findOneAndUpdate(
        { _id: cartId, 'products.product': productId },
        { $set: { 'products.$.quantity': quantity } },
        { new: true }
      );
      if(!updateCart){
        throw new Error('Cart  or product not found');
      }

      return updateCart;
      
    } catch (error) {
      console.error('Error updating product quantity:', error);
      throw error;
    }
  }

  async removeAllProductsFromCart(cartId){
    try {
      const updateCart = await CartModel.findByIdAndUpdate(
        cartId,
        { $set: { products: [] } },
        { new: true }
      );
      if(!updateCart){
        throw new Error('Cart not found');
      }
      return updateCart;
      
    } catch (error) {
      console.error('Error removing all products from cart:', error);
      throw error
    }
  }




}


