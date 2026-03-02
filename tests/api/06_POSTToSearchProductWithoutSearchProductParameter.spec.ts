import { test, expect } from '@playwright/test';
import { searchProductWithoutParameter } from '../../api/searchProduct.api';

test('API 6: POST to Search Product Without Search Product Parameter', async ({ request }) => {
    const response = await searchProductWithoutParameter(request);
    const { responseCode, message } = await response.json();
    expect(responseCode).toBe(400);
    expect(message).toBe('Bad request, search_product parameter is missing in POST request.');
});