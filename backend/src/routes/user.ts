import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

export const UserRouter=new Hono<{
    Bindings: {
        CONNECTION_POOLING_DATABASE_URL: string;
        JWT_SECRET: string;
      }
}>()
UserRouter.post("/signup", async (c) => {
    const Prisma = new PrismaClient({
      datasourceUrl: c.env.CONNECTION_POOLING_DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try {
      const user = await Prisma.user.create({
        data: {
          name: body?.name,
          email: body?.email,
          password: body?.password,
        },
      });
      const jwtToken = await sign({ payload: user }, c.env.JWT_SECRET);
      return c.json({
        token: jwtToken,
        message: "Signed Up Successfully",
      });
    } catch (error: any) {
      c.status(411);
      return c.text(" hello error");
    }
  });
  UserRouter.post("/signIn", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.CONNECTION_POOLING_DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
          password: body.password,
        },
      });
      if (!user) return c.json({ message: "user does not exist" });
      const jwtToken = await sign({ payload: user }, c.env.JWT_SECRET);
      return c.json({ message: "Signed In Successfully", token: jwtToken ,user:user});
    } catch (error: any) {
      c.status(403); //unauthorized creds
      return c.text("not founded");
    }
  });