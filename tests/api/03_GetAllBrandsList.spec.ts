import { test, expect } from '@playwright/test';
import { getBrands } from '../../api/brands.api';
import { brandsSchema } from '../../api/schemas/brands.schema';

test('API 3: Get All Brands List', async ({ request }) => {
    const response = await getBrands(request);
    
    const {responseCode, brands} = await response.json();
    expect(responseCode).toBe(200);
    for (const brand of brands) {
        const validatedBrand = brandsSchema.parse(brand);
        expect(validatedBrand).toBeDefined();
    }
});