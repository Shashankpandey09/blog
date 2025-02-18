// app.ts
import { Hono } from "hono";
import { UserRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// 1. Define proper types
type AppVariables = {
  prisma: ReturnType<typeof createPrismaClient>;
};

type Bindings = {
  CONNECTION_POOLING_DATABASE_URL: string;
  JWT_SECRET: string;
};

// 2. Create Prisma client factory function
export const createPrismaClient = (datasourceUrl: string) => {
  return new PrismaClient({
    datasources: {
      db: { url: datasourceUrl },
    },
  }).$extends(withAccelerate());
};

const app = new Hono<{
  Bindings: Bindings;
  Variables: AppVariables;
}>();
// 3. Middleware for Prisma initialization
app.use("*", async (c, next) => {
  const prisma = createPrismaClient(c.env.CONNECTION_POOLING_DATABASE_URL);
  // Store Prisma instance in context
  c.set("prisma", prisma);
  // Schedule cleanup tasks,Cleanup after request completes
  c.executionCtx.waitUntil(prisma.$disconnect())
     // Close database connection
     // Immediately invoke to return a Promise 
  // Continue to the next middleware/route
  await next();
});

// 4. Routes
app.get("/", (c) => c.text("Hello from Hono!"));
app.route("/api/v1/user", UserRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
