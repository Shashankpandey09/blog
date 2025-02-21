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
export type userSignInSchemaType = z.infer<typeof userSignInSchema>;
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
export type userSignUpSchemaType = z.infer<typeof userSignUpSchema>;
export declare const blogSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    Thumbnail: z.ZodOptional<z.ZodAny>;
    published: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    published: boolean;
    Thumbnail?: any;
}, {
    title: string;
    content: string;
    published: boolean;
    Thumbnail?: any;
}>;
export type blogSchemaType = z.infer<typeof blogSchema>;
