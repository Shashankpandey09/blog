import {z} from "zod"
//user sigin schema= password , email

export const userSignInSchema=z.object({
    email:z.string().email("not a valid email"),
    password:z.string().min(1,"password required")
})
export type userSignInSchemaType= z.infer<typeof userSignInSchema>
//user signUp schema=name,password,email
export const userSignUpSchema=z.object({
    name:z.string().optional(),
    email:z.string().email("not a valid email"),
    password:z.string().min(1,"password required")
})
export type userSignUpSchemaType=z.infer<typeof userSignUpSchema>
//blog post title ,content ,thumbnail,published
export const blogSchema=z.object({
    title:z.string().min(1,{message:"Title Required"}),
    content:z.string().min(1,{message:'content required'}),
    Thumbnail:z.any().optional(),
    published:z.boolean()
})
export type blogSchemaType=z.infer<typeof blogSchema>