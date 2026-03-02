import { test, expect } from '@playwright/test';
import { postProduct } from '../../api/products.api';

test('API 2: Post to All Products List', async ({ request }) => {
    const response = await postProduct(request);
    const { responseCode, message } = await response.json();
    expect(responseCode).toBe(405);
    expect(message).toBe('This request method is not supported.');
});