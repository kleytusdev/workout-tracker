import { User as PrismaUser } from "@prisma/client";

export class UserEntity implements PrismaUser {
  id: number
  email: string
  username: string
  password: string
  createdAt: Date;
  updatedAt: Date
}
