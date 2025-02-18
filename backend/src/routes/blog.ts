import { Hono } from "hono";
import {  PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const blogRouter=new Hono<{
  Bindings:{
    CONNECTION_POOLING_DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
    userId:number
  }
}>()
blogRouter.use('/*',async(c,next)=>{
  const AuthHeader=c.req.header("Authorization")||"";
  if(!AuthHeader||!AuthHeader.startsWith("Bearer")){
    c.status(401)
    return c.json({
      message:"AuthHeader not send properly Either it does not starts with Bearer or is undefined"
    })
  }
  try {
    const token:string =AuthHeader.split(" ")[1];
    const {id}:any=await verify(token,c.env.JWT_SECRET)
     c.set("userId",id) 
     await next()
  } catch (error:any) {
   c.status(403)
   return c.json({
    msg:error.message
   })
  }
})

blogRouter.post("/", async(c) => {
  const prisma=new PrismaClient({
    datasourceUrl:c.env.CONNECTION_POOLING_DATABASE_URL
  }).$extends(withAccelerate());
  const body=await c.req.json()
  const authorId=c.get("userId")
  try {
    const res= await prisma.blog.create({
      data:{
        authorId:authorId,
        title:body.title,
        Content:body.content,
        Thumbnail:body.Thumbnail,
        published:body.published
      }
    });
    return c.json({
      message:res
    })
  } catch (error:any) {
    c.status(400)
    return c.text(`following error is Thrown ${error.message}`)
  }
  });
  blogRouter.put("/:id", async(c) => {
    const prisma=new PrismaClient({
      datasourceUrl:c.env.CONNECTION_POOLING_DATABASE_URL
    }).$extends(withAccelerate())
    const body=await c.req.json()
    const id=c.req.param("id")
    const authorId=c.get("userId")
   try {
    const res =await prisma.blog.update({
      where:{id:Number(id),authorId:authorId},
      data:{ title:body.title,
        Content:body.content,
        Thumbnail:body.Thumbnail,
        published:body.published}
    })
    if(!res) {
      c.status(404)
      return c.json({message:"blog not found"})
    }
   return c.json({
      message:`updated successfully`,
      response:res
    });
   } catch (error:any) {
    c.status(400)
    return c.json({
      message:"error",
      err:error.message
    })
   } 
  });

    // pagination required
    blogRouter.get("/bulk", async(c) => {
      const prisma=new PrismaClient({
        datasourceUrl:c.env.CONNECTION_POOLING_DATABASE_URL
      }).$extends(withAccelerate())
      try {
        const res=await prisma.blog.findMany()
        if(!res) {c.status(404)
        return c.text("blogs not found")
        }
        return c.json({
          message:res
        }) 
      } catch (error:any) {
        c.status(500)
        return c.json({
          message:error.message
        }) 
      }
      
    });
  blogRouter.get("/:id", async(c) => {
    const id=c.req.param("id")
    const prisma=new PrismaClient({
      datasourceUrl:c.env.CONNECTION_POOLING_DATABASE_URL
    }).$extends(withAccelerate())
    try {
      const res=await prisma.blog.findFirst({
        where:{id:Number(id)}
      })
      if (!res) {
        c.status(404)
       return c.json({
          message:"Blog not found"
        })
      }
      return c.json({
        response:res
      })
    } catch (error:any) {
      c.status(500)
      return c.json({
        response:error.message
      })
    }
    
  });

  blogRouter.delete('/delete/:id',async(c)=>{
    const prisma=new PrismaClient({
      datasourceUrl:c.env.CONNECTION_POOLING_DATABASE_URL
    }).$extends(withAccelerate())
    const id=c.req.param("id")
    try {
      await prisma.blog.delete({
        where:{id:Number(id)}
      })
      return c.json({
        message:"deleted successfully"
      })
    } catch (error:any) {
      return c.json({
        err:error.message
      })
    }
  })
  