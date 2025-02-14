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

blogRouter.post("/", async(c) => {
  const prisma=new PrismaClient({
    datasourceUrl:c.env.CONNECTION_POOLING_DATABASE_URL
  }).$extends(withAccelerate());
  const {body}=await c.req.json()
  try {
    const res= await prisma.blog.create({
      data:{
        authorId:1,
        title:body.title,
        Content:body.content,
        Thumbnail:body.Thumbnail,
        published:body.published
      }
    });
    return c.json({
      message:res
    })
  } catch (error) {
    c.status(403)
    return c.text(`following error is Thrown ${error}`)
  }
  });
  blogRouter.put("/", (c) => {
    const prisma=new PrismaClient({
      datasourceUrl:c.env.CONNECTION_POOLING_DATABASE_URL
    }).$extends(withAccelerate())
    
    return c.text("Hello Hono!");
  });
  blogRouter.get("/:id", (c) => {
    return c.text("Hello Hono!");
  });
  blogRouter.get("/bulk", (c) => {
    return c.text("Hello Hono!");
  });
  