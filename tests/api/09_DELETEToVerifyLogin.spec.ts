import { test, expect } from '@playwright/test';
import { verifyLoginDelete } from '../../api/verifyLogin.api';

test('API 9: DELETE to Verify Login', async ({ request }) => {
    const response = await verifyLoginDelete(request);
    const { responseCode, message } = await response.json();
    expect(responseCode).toBe(405);
    expect(message).toBe('This request method is not supported.');
});
