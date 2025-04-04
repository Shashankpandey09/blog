"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogSchema = exports.userSignUpSchema = exports.userSignInSchema = void 0;
const zod_1 = require("zod");
//user sigin schema= password , email
exports.userSignInSchema = zod_1.z.object({
    email: zod_1.z.string().email("not a valid email"),
    password: zod_1.z.string().min(1, "password required")
});
//user signUp schema=name,password,email
exports.userSignUpSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email("not a valid email"),
    password: zod_1.z.string().min(1, "password required")
});
//blog post title ,content ,thumbnail,published
exports.blogSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "Title Required" }),
    content: zod_1.z.string().min(1, { message: 'content required' }),
    Thumbnail: zod_1.z.any().optional(),
    published: zod_1.z.boolean(),
    tags: zod_1.z.string().array().optional()
});
