import { Hono } from "hono";
import { UserRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const app=new Hono<{
  Bindings: {
      CONNECTION_POOLING_DATABASE_URL: string;
      JWT_SECRET: string;
    }
}>()
app.get('/', (c) => c.text('Hello from Hono!'));
app.route('/api/v1/user',UserRouter)
app.route('/api/v1/blog',blogRouter)

export default app;

//DB URL
//
//connection_pooling URL
//DATABASE_URL=""
