import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
    accessToken?: string;
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: null | string | boolean;
  createdAt: string;
  updatedAt: string;
}
