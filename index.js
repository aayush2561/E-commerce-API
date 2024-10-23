import express from 'express';
import cookieParser from 'cookie-parser'; 
import db from './config/db.js'; 


import AuthRoute from './routes/AuthRoute.js';
import UserRoute from './routes/UserRoute.js';

import { errorHandler } from './middleware/ErrorHandler.js';


const app = express();
const port = 3000;


db();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', AuthRoute); 
app.use('/api/user',UserRoute)

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
