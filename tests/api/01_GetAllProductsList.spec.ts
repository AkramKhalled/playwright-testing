import { test, expect } from '@playwright/test';
import { getProducts } from '../../api/products.api';
import { productSchema } from '../../api/schemas/product.schema';

test('API 1: Get All Products List', async ({ request }) => {
    const response = await getProducts(request);
    
    expect(response.status()).toBe(200);

    const body = await response.json();
    
    const products = body.products;
    for (const product of products) {
        const validatedProduct = productSchema.parse(product);
        expect(validatedProduct).toBeDefined();
    }
  });