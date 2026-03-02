import { test, expect } from '@playwright/test';
import { createAccount } from '../../api/createAccount.api';
import { updateAccount } from '../../api/updateAccount.api';
import { dataFile } from '../../utils/dataFile';
import { createUniqueEmail } from '../../utils/createUniqueEmailMethod';
import { createNewUserName } from '../../utils/createNewUserName';
import { randomDay, randomMonth, randomYear } from '../../utils/randomDateOfBirth';

test('API 13: PUT Method to Update User Account', async ({ request }) => {
    const email = createUniqueEmail();
    const name = createNewUserName();
    const password = dataFile.validPassword;
    const day = randomDay();
    const month = randomMonth();
    const year = randomYear();

    const createPayload = {
        name,
        email,
        password,
        title: 'Mr',
        birth_date: String(day),
        birth_month: String(month),
        birth_year: String(year),
        firstname: dataFile.firstName,
        lastname: dataFile.lastName,
        company: dataFile.company,
        address1: dataFile.address1,
        address2: dataFile.address2,
        country: 'United States',
        zipcode: dataFile.zipCode,
        state: dataFile.state,
        city: dataFile.city,
        mobile_number: dataFile.mobileNumber,
    };

    await createAccount(request, createPayload);

    const updatePayload = {
        ...createPayload,
        firstname: 'UpdatedFirst',
        lastname: 'UpdatedLast',
        address1: '456 Updated Street',
    };

    const response = await updateAccount(request, updatePayload);
    const { responseCode, message } = await response.json();
    expect(responseCode).toBe(200);
    expect(message).toBe('User updated!');
});
