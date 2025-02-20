import { Hono } from "hono";
import { JWTPayload } from "hono/utils/jwt/types";
import { createPrismaClient } from "..";
import { payloadExtractor } from "../middleware/tokenExtracter";

type AppVariables = {
  prisma: ReturnType<typeof createPrismaClient>;
  payload: JWTPayload;
};

export const blogRouter = new Hono<{
  Bindings: {
    CONNECTION_POOLING_DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: AppVariables;
}>();
blogRouter.use("/*", async (c, next) => {
  const AuthHeader = c.req.header("Authorization") || "";
  if (!AuthHeader || !AuthHeader.startsWith("Bearer")) {
    c.status(401);
    return c.json({
      message:
        "AuthHeader not send properly Either it does not starts with Bearer or is undefined",
    });
  }
  try {
    const token: string = AuthHeader.split(" ")[1];
    const payload = await payloadExtractor(token, c.env.JWT_SECRET);
    c.set("payload", payload);
    await next();
  } catch (error: any) {
    c.status(403);
    return c.json({
      msg: error.message,
    });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const payload = c.get("payload");

  const id = Number(payload["id"]);
  try {
    const res = await prisma.blog.create({
      data: {
        authorId: id,
        title: body.title,
        Content: body.content,
        Thumbnail: body.Thumbnail,
        published: body.published,
      },
    });
    return c.json({
      message: res,
    });
  } catch (error: any) {
    c.status(400);
    return c.text(`following error is Thrown ${error.message}`);
  }
});
blogRouter.put("/:id", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const id = c.req.param("id");
  const payload = c.get("payload");
  try {
    const res = await prisma.blog.update({
      where: { id: Number(id), authorId: Number(payload.id) },
      data: {
        title: body.title,
        Content: body.content,
        Thumbnail: body.Thumbnail,
        published: body.published,
      },
    });
    if (!res) {
      c.status(404);
      return c.json({ message: "blog not found" });
    }
    return c.json({
      message: `updated successfully`,
      response: res,
    });
  } catch (error: any) {
    c.status(400);
    return c.json({
      message: "error",
      err: error.message,
    });
  }
});

// pagination required
blogRouter.get("/bulk", async (c) => {
  const prisma = c.get("prisma");
  const page=c.req.query("page")||1;
  const limit=c.req.query("limit")||5;
 // checking for input validation
 if(Number(page) < 1||Number(limit) < 1){
  c.status(400)
  return c.json({
    message:"Invalid pagination parameter"
  })
 }
 const skip=(Number(page)-1)*Number(limit)
  try {
    const [blogs,total]=await Promise.all([
      prisma.blog.findMany({
        skip:skip,
        take:Number(limit),
        orderBy:{createdAt:'desc'}
      }),
      prisma.blog.count()
    ])
    const pages=Math.ceil(total/Number(limit))
    if (!blogs) {
      c.status(404);
      return c.text("blogs not found");
    }
    return c.json({
      response:{
        blogs:blogs,
        totalBlogs:total,
        totalPages:pages,
        hasNextPage:(Number(page) <=pages),
        hasPreviousPage:(Number(page)>1)
      } 
    });
  } catch (error: any) {
    c.status(500);
    return c.json({
      message: error.message,
    });
  }
});
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = c.get("prisma");
  try {
    const res = await prisma.blog.findFirst({
      where: { id: Number(id) },
    });
    if (!res) {
      c.status(404);
      return c.json({
        message: "Blog not found",
      });
    }
    return c.json({
      response: res,
    });
  } catch (error: any) {
    c.status(500);
    return c.json({
      response: error.message,
    });
  }
});

blogRouter.delete("/delete/:id", async (c) => {
  const prisma = c.get("prisma");
  const id = c.req.param("id");
  try {
    await prisma.blog.delete({
      where: { id: Number(id) },
    });
    return c.json({
      message: "deleted successfully",
    });
  } catch (error: any) {
    return c.json({
      err: error.message,
    });
  }
});
