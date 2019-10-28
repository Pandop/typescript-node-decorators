import express, { Application, Response, Request } from 'express'
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import morgan from 'morgan';

import './controllers/LoginController';
import './controllers/HomeController';
import { AppRouter } from './AppRouter';

// Create an express app
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['laskdjf'] }));
app.use(AppRouter.getInstance());

// Run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
    .on("error", (error: Error) => console.log("Something went wrong! Error:", error))
