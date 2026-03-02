import { z } from 'zod';

export const productCategorySchema = z.object({
    usertype: z.object({
        usertype: z.string(),
    }),
    category: z.string(),
});