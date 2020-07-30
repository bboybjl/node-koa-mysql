// src/controllers/user.ts
import { Context } from 'koa';
import { getManager } from 'typeorm';
import axios from 'axios'

import { User } from '../entity/user';
const fs = require('fs');
export default class UserController {
  public static async index(ctx: Context) {
  
    ctx.status = 200;
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./src/index.html');
  }
 
  public static async listUsers(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();

    ctx.status = 200;
   
    ctx.body = users;
  }

  public static async showUserDetail(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(+ctx.params.id);

    if (user) {
      ctx.status = 200;
      ctx.body = user;
    } else {
      ctx.status = 404;
    }
  }

  public static async updateUser(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    await userRepository.update(+ctx.params.id, ctx.request.body);
    const updatedUser = await userRepository.findOne(+ctx.params.id);

    if (updatedUser) {
      ctx.status = 200;
      ctx.body = updatedUser;
    } else {
      ctx.status = 404;
    }
  }

  public static async deleteUser(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    await userRepository.delete(+ctx.params.id);

    ctx.status = 204;
  }
}