import express from 'express';
import cookieParser from 'cookie-parser'; 
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'


import db from './config/db.js'; 
import {swaggerDocs} from './docs/Swaggerdocs.js';

import AuthRoute from './routes/AuthRoute.js';
import UserRoute from './routes/UserRoute.js';
import OrderRoute from './routes/OrderRoute.js'

import { errorHandler } from './middleware/ErrorHandler.js';


const app = express();
const port = 3000;


db();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true 
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/auth', AuthRoute); 
app.use('/api/user',UserRoute);
app.use('/api/order',OrderRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
