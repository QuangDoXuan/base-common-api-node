import 'reflect-metadata';
import './utils/env';
import { createConnection, getConnection } from 'typeorm';
import express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import Routes from './route/routes';
import config from './config';
import logRequest from './middleware/logRequest';
import log from './utils/log';


const cors = require('cors');
const logger = log('Index');
const app = express();
// const http = require('http').Server(app);
app.use(bodyParser.json());
app.use(cors());
// app.use((req: Request, res: Response, next: NextFunction) => logRequest(req, res, next));

Routes.forEach(route => {
  app[route.method](route.route, route.middleware ? route.middleware : [], (req: Request, res: Response) => {
    return route.action(req, res);
  });
});

Routes.forEach(route => {
  app[route.method](route.route, route.middleware ? route.middleware : [], (req: Request, res: Response) => {
    return route.action(req, res);
  });
});


export { app };