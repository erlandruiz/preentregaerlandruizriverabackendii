import { Schema, model } from "mongoose";
import mongosePaginate from 'mongoose-paginate-v2';

export const productSchema = new Schema({

    
        title:{ type:String, required:true},
        description: { type:String, required:true},
        code: {
            type: String,
            unique: true,
            required: true,
          },
        price: { type:Number, required:true},
        status: { type: Boolean, default: true },
        stock: { type:Number, required:true},
        category:{ type:String, required:true},
        thumbnails: Array,

 });

 productSchema.plugin(mongosePaginate);
 export const ProductModel = model('products', productSchema);

 
