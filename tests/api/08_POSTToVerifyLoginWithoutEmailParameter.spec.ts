import { test, expect } from '@playwright/test';
import { verifyLoginWithoutEmail } from '../../api/verifyLogin.api';
import { dataFile } from '../../utils/dataFile';

test('API 8: POST to Verify Login without email parameter', async ({ request }) => {
    const response = await verifyLoginWithoutEmail(request, dataFile.validPassword);
    const { responseCode, message } = await response.json();
    expect(responseCode).toBe(400);
    expect(message).toBe('Bad request, email or password parameter is missing in POST request.');
});
