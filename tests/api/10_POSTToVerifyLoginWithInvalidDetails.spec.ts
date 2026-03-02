import { test, expect } from '@playwright/test';
import { verifyLogin } from '../../api/verifyLogin.api';
import { dataFile } from '../../utils/dataFile';

test('API 10: POST to Verify Login with invalid details', async ({ request }) => {
    const response = await verifyLogin(request, dataFile.invalidEmail, dataFile.invalidPassword);
    const { responseCode, message } = await response.json();
    expect(responseCode).toBe(404);
    expect(message).toBe('User not found!');
});
