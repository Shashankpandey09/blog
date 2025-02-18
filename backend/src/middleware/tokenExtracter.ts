
import { verify } from "hono/jwt";

export const payloadExtractor=async(token:string,JWT_SECRET:string)=>{
const tok=await verify(token,JWT_SECRET);
return tok;
}
