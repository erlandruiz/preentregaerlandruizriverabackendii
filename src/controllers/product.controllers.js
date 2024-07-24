
import { ProductModel } from '../daos/mongodb/models/product.model.js';
import * as productService from '../services/product.services.js';

export const create = async(req, res, next)=>{
  
    try {
        const newProduct = await productService.create(req.body)

        if(!newProduct) res.status(404).json({msg:"Error create product!"});
        else res.status(200).json(newProduct);
        
    } catch (error) {
        next(error.message);
    }
}

export const getAll =async (req, res, next)=>{
   

    try {
        const {page=1, limit=10, category, sort} = req.query;

        const products = await productService.getAll(page, limit, category, sort)

        const currentPage = parseInt(page,10) // convierte el valor de page (que es un string) a un número entero en base 10.

        const nextPage = products.hasNextPage ? currentPage +1 : null;
        const prevPage = products.hasPrevPage ? currentPage -1 : null;

        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`; // obtiene la linea de codigo de la lo que se escribe en el explorer la hacer el GET 

      

        res.status(200).json({
            status: 'success',
            products: products.docs,
            totalDocs: products.totalDocs,
            limit: products.limit,
            totalPages: products.totalPages,
            page: products.page,
            pagingCounter: products.pagingCounter,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage,
            nextPage,
            prevPageLink: prevPage ? `${baseUrl}?page=${prevPage}&limit=${limit}${category ? `&category=${category}` : ''}${sort ? `&sort=${sort}` : ''}` : null,
            nextPageLink: nextPage ? `${baseUrl}?page=${nextPage}&limit=${limit}${category ? `&category=${category}` : ''}${sort ? `&sort=${sort}` : ''}` : null,
          });
    } catch (error) {
        next(error.message);
    }
}

export const getById = async(req, res, next)=>{
    try {
        const {id} = req.params;

        const product = await productService.getById(id);
        if(!product) res.status(404).json({msg:'Product not found'});
        else res.status(200).json(product);
        
    } catch (error) {
        next(error.message);
    }
}

export const update = async(req, res, next)=>{

    try {
        const {id} = req.params;
        const updateProduct = await productService.update(id, req.body);
        if(!updateProduct) res.status(404).json({msg:'Error product Update'});
        else res.status(200).json(updateProduct);
        
    } catch (error) {
        next(error.message);
    }
}

export const deleteProduct = async(req, res, next)=>{
    try {
        const {id}=req.params;
        const deleteProduct = await productService.deleteProduct(id);
        if(!deleteProduct) res.status(404).json({msg:'Error product Delete'});
        else res.status(200).json({ msg: `Product id: ${id} deleted` });
    } catch (error) {
        next(error.message);
    }
}



//PArte de RENDER para handlebars
export const getAllProductsControllerHandlebars = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const options = {
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
        };
        const result = await ProductModel.paginate({}, options);

        // console.log('este dato e sde product.comntroller' ,result); // Verifica los datos obtenidos

        const currentPage = parseInt(page, 10);
        const nextPage = result.hasNextPage ? currentPage + 1 : null;
        const prevPage = result.hasPrevPage ? currentPage - 1 : null;

        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;

        res.render('realtimeproducts', {
          products: result.docs,
          currentPage: result.page,
          totalPages: result.totalPages,
          prevPageLink: prevPage ? `${baseUrl}?page=${prevPage}&limit=${limit}` : null,
          nextPageLink: nextPage ? `${baseUrl}?page=${nextPage}&limit=${limit}` : null,
        });
      } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
      }
};




