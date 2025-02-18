import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { createPrismaClient } from "..";

// 1. Define proper types
type AppVariables = {
  prisma: ReturnType<typeof createPrismaClient>;
};

type Bindings = {
  CONNECTION_POOLING_DATABASE_URL: string;
  JWT_SECRET: string;
};



// 3. Fix context type definition
export const UserRouter = new Hono<{
  Bindings: Bindings;
  Variables: AppVariables;
}>();

// 4. Use middleware-injected Prisma in both routes
UserRouter.post("/signup", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      token: jwtToken,
      message: "Signed Up Successfully",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    c.status(400);
    return c.json({ error: "Registration failed" });
  }
});

UserRouter.post("/signin", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      c.status(404);
      return c.json({ error: "User not found" });
    }

    if (user.password !== body.password) {
      c.status(401);
      return c.json({ error: "Invalid credentials" });
    }

    const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      message: "Signed In Successfully",
      token: jwtToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signin Error:", error);
    c.status(500);
    return c.json({ error: "Login failed" });
  }
});