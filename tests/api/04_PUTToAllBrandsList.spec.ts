import { test, expect } from '@playwright/test';
import { postBrand } from '../../api/brands.api';

test('API 4: PUT to All Brands List', async ({ request }) => {
    const response = await postBrand(request);
    const { responseCode, message } = await response.json();
    expect(responseCode).toBe(405);
    expect(message).toBe('This request method is not supported.');
});