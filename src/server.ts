// src/server.ts
import Koa from 'koa';
import cors from '@koa/cors';     //跨域使用
import bodyParser from 'koa-bodyparser';    //处理post请求的ctx
import { createConnection } from 'typeorm';  //typeorm来创建连接
import 'reflect-metadata';
import jwt from 'koa-jwt';
import { JWT_SECRET } from './constants';  //
import {protectedRouter, unprotectedRouter} from './routes';   //koa路由
import { logger } from './logger';    //试写中间件 记录查看请求的方式和返回状态
createConnection()
  .then(() => {
    // 初始化 Koa 应用实例
    const app = new Koa();

    // 注册中间件
    app.use(logger());
    app.use(cors());
    app.use(bodyParser());

    // 响应用户请求
     // 无需 JWT Token 即可访问
     app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

     // 注册 JWT 中间件
     app.use(jwt({ secret: JWT_SECRET }).unless({ method: 'GET' }));
 
     // 需要 JWT Token 才可访问
     app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

    // 运行服务器
    app.listen(3000);
  })
  .catch((err: string) => console.log('TypeORM connection error:', err));