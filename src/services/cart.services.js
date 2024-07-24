import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";

const cartDao = new CartDaoMongoDB();

const productDao = new ProductDaoMongoDB();

export const getAll = async () => {
  try {
    const carts = await cartDao.getAll();
    if (!carts) return false;
    else return carts;
  } catch (error) {
    throw error;
    // console.log(error);
  }
};

export const create = async () => {
  try {
    const newcart = await cartDao.create();
    if (!newcart) return false;
    else return newcart;
  } catch (error) {
    throw error;
    // console.log(error);
  }
};

export const getById = async (cartId) => {
  try {
    const cart = await cartDao.getById(cartId);
    return cart;
  } catch (error) {
    throw error;
    // console.log(error);
  }
};

export const addProductToCart = async (cartId, productId) => {
  try {
    const existsCart = await getById(cartId);
    if (!existsCart) return null;

    const existsProduct = await productDao.getById(productId);
    if (!existsProduct) return null;

    const addProductToCart = await cartDao.addProductToCart(cartId, productId);

    return addProductToCart;
  } catch (error) {
    throw error;
    // console.log(error);
  }
};

export const deleteCart = async (cartId) => {
  try {
    const deletedCart = await cartDao.deleteCart(cartId);
    if (!deletedCart) return false;
    else return deletedCart;
  } catch (error) {
    throw error;
    // console.log(error);
  }
};

export const removeProductFromCart = async (cartId, productId) => {
  try {
    const existsCart = await getById(cartId);
    if (!existsCart) return null;
    const existsProductInCart = await cartDao.existsProductInCart(
      cartId,
      productId
    );
    if (!existsProductInCart) return null;
    const removeProductFromcart = await cartDao.removeProductFromCart(
      cartId,
      productId
    );
    return removeProductFromcart;
  } catch (error) {
    throw error;
    // console.log(error);
  }
};

export const updateCart = async (cartId, obj) => {
  try {
    const existsCart = await getById(cartId);
    if (!existsCart) return null;

    const updateCart = await cartDao.updateCart(cartId, obj);
    return updateCart;
  } catch (error) {
    throw error;
    // console.log(error);
  }
};

export const updateProductQuantitytoCart = async (
  cartId,
  productId,
  quantity
) => {
  try {
    const existsCart = await getById(cartId);
    if (!existsCart) return null;
    const existsProductInCart = await cartDao.existsProductInCart(
      cartId,
      productId
    );
    if (!existsProductInCart) return null;
    const updateProductQuantitytoCart =
      await cartDao.updateProductQuantitytoCart(cartId, productId, quantity);
    return updateProductQuantitytoCart;
  } catch (error) {
    throw error;
    // console.log(error);
  }
};

export const removeAllProductsFromCart = async (cartId) => {
  try {
    const existsCart = await getById(cartId);
    if (!existsCart) return null;
    const removeAllProductsFromCart = await cartDao.removeAllProductsFromCart(
      cartId
    );
    return removeAllProductsFromCart;
  } catch (error) {
    throw error;
    // console.log(error);
  }
};
