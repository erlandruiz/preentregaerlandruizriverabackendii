import ProductDaoMongoDB from "../daos/mongodb/product.dao.js"

const productDao = new ProductDaoMongoDB

export const create = async(obj)=>{

    try {
        const newProduct = await productDao.create(obj);
        if (!newProduct) return false;
        else return newProduct;
        
    } catch (error) {
        throw error;
        // console.log(error);
    }
}

export const getAll = async(page, limit, category, sort)=>{
    try {
        const products = await productDao.getAll(page, limit, category, sort);
        return products;
        
    } catch (error) {
        throw error;
        // console.log(error);
    }
}

export const getById= async(id)=>{
    try {
        const product = await productDao.getById(id);
        if(!product) return false;
        else return product;
        
    } catch (error) {
        throw error;
        // console.log(error);
    }
}
export const update= async(id, obj)=>{
    try {
        const updateProduct = await productDao.update(id, obj);
        if(!updateProduct) return false;
        else return updateProduct;
        
    } catch (error) {
        throw error;
        // console.log(error);
    }
}

export const deleteProduct = async(id)=>{
    try {
        const deleteProduct = await productDao.deleteProduct(id);
        if(!deleteProduct) return false;
        else return deleteProduct;
        
    } catch (error) {
        throw error;
        // console.log(error);
    }
}

