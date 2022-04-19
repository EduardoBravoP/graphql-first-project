import crypto from 'crypto'
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import User from "../models/User";

@Resolver()
export class UserResolver {
  private data: User[] = [];

  @Query(() => [User])
  async users() {
    return this.data
  }

  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string
  ) {
    const user = { id: crypto.randomUUID(), name }

    this.data.push(user)

    return user
  }

  @Mutation(() => User)
  async removeUser(
    @Arg('id') id: string
  ) {
    const user = this.data.find(user => user.id === id)
    const newUsers = this.data.filter(user => user.id !== id)

    this.data = newUsers

    return user
  }
}