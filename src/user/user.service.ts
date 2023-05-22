import {UserModel} from "./models/user.model";
import {PrismaClient} from "prisma/prisma-client/scripts/default-index";

export class UserService {
  private prisma

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(): Array<UserModel> {
    const users: Array<UserModel> = this.prisma.user.findMany()
    return users;
  }
}