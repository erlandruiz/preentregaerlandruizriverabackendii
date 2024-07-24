import { ProductModel } from "./models/product.model.js";
export default class ProductDaoMongoDB {
  async create(obj) {
    try {
      const newProduct = ProductModel.create(obj);
      return newProduct;
    } catch (error) {
      console.error("Error creating a product:", error);
      throw error;
    }
  }

  async getAll(page=1, limit=10, category, sort) {
    try {
        const query = {};
        if(category){
            query.category = { $regex: category, $options: 'i' }; // Filtrado por categoria (insensible a mayúsculas/minúsculas)
        }

        const options = {
            page:page,
            limit: limit,
            sort: sort? {price:sort==='desc'?-1:1}:{}, // Ordenar por precio si sort está definido
        }
        const response = await ProductModel.paginate(query, options);
        return response;
        
    }
    catch(error){
        console.error("Error getting products:", error);
      throw error;
    }
  }

  async getById(id){

    try {
        const product = await ProductModel.findById(id);
        if (!product) throw new Error("Product not found");
        return product;

        
    } catch (error) {
        console.error("Error getting a product:", error);
        throw error;
    }

  }

  async update(id, obj){

    try {
        const updateProduct = await ProductModel.findByIdAndUpdate(id, obj, {new: true});
        return updateProduct;

        
    } catch (error) {
        console.error(`Error updating a product with id ${id}:`, error);
        throw error;
    }

  }

  async deleteProduct(id){
    try {

        const deleteProduct = await ProductModel.findByIdAndDelete(id);
        return deleteProduct;

        
    } catch (error) {
        console.error(`Error deleting  a product with id ${id}:`, error);
        throw error;
    }
  }
}


