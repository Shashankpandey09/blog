import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode,verify } from "hono/jwt";

export const blogRouter=new Hono<{
  Bindings:{
    CONNECTION_POOLING_DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()

blogRouter.post("/", (c) => {
    return c.text("Hello Hono!");
  });
  blogRouter.put("/", (c) => {
    return c.text("Hello Hono!");
  });
  blogRouter.get("/:id", (c) => {
    return c.text("Hello Hono!");
  });
  blogRouter.get("/bulk", (c) => {
    return c.text("Hello Hono!");
  });
  