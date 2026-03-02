import { z } from 'zod';
import { productCategorySchema } from './productCategory.schema';

export const productSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.string(),
    brand: z.string(),
    category: productCategorySchema,
});