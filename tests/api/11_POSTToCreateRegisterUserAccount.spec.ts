import { test, expect } from '@playwright/test';
import { createAccount } from '../../api/createAccount.api';
import { dataFile } from '../../utils/dataFile';
import { createUniqueEmail } from '../../utils/createUniqueEmailMethod';
import { createNewUserName } from '../../utils/createNewUserName';
import { randomDay, randomMonth, randomYear } from '../../utils/randomDateOfBirth';

test('API 11: POST to Create/Register User Account', async ({ request }) => {
    const email = createUniqueEmail();
    const name = createNewUserName();
    const day = randomDay();
    const month = randomMonth();
    const year = randomYear();

    const response = await createAccount(request, {
        name,
        email,
        password: dataFile.validPassword,
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
    });

    const { responseCode, message } = await response.json();
    expect(responseCode).toBe(201);
    expect(message).toBe('User created!');
});
