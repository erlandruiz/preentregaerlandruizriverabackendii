import express from 'express';

import { initMongoDB } from './daos/mongodb/connection.js';
import cartRouter from './routes/cart.routes.js';
import productRouter from './routes/product.routes.js';

import bodyParser from 'body-parser';

import { __dirname } from './dirname.js';
import path from 'path';
import handlebars from "express-handlebars";
import viewsRouter from './routes/views.routes.js';
import { initializePassport } from './config/passport.config.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'

import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

const PORT = 8080;


// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());


// if(process.env.PERSISTENCE ==='MONGO') initMongoDB()
initMongoDB()


// Passport config
initializePassport();
app.use(passport.initialize());

  
    app.use('/api/carts', cartRouter);
    app.use('/api/products', productRouter);
    app.use('/', viewsRouter);

  

    // Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


// Configuración de Handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
  })
);


app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
  // Middlewares
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  //Para capturar archivos estaticos
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(errorHandler); // Asegúrate de que esto esté al final


  app.listen(PORT,()=>{
    console.log(`Server listening on http://localhost:${PORT}`);
  });
  
