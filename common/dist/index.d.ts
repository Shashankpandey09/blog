import { z } from "zod";
export declare const userSignInSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type userSignUpSchemaType = z.infer<typeof userSignInSchema>;
export declare const userSignUpSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export type userSignInSchemaType = z.infer<typeof userSignInSchema>;
export declare const blogSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    Thumbnail: z.ZodOptional<z.ZodString>;
    published: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    published: boolean;
    Thumbnail?: string | undefined;
}, {
    title: string;
    content: string;
    published: boolean;
    Thumbnail?: string | undefined;
}>;
export type blogSchemaType = z.infer<typeof blogSchema>;
