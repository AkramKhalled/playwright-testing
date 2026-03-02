import { test, expect } from '@playwright/test';
import { searchProduct } from '../../api/searchProduct.api';
import { productSchema } from '../../api/schemas/product.schema';

test('API 5: POST to Search Product', async ({ request }) => {
    const response = await searchProduct(request, 'top');
    const { responseCode, products } = await response.json();
    expect(responseCode).toBe(200);
    expect(products.length).toBeGreaterThan(0);
    for (const product of products) {
        const categoryName = product.category.category;
        const productName = product.name;
        expect(
            productName.toLowerCase().includes('top') ||
            categoryName.toLowerCase().includes('top')
        ).toBe(true);

        const validatedProduct = productSchema.parse(product);
        expect(validatedProduct).toBeDefined();
    }
});
