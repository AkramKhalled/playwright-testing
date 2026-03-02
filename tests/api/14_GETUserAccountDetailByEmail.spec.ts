import { test, expect } from '@playwright/test';
import { createAccount } from '../../api/createAccount.api';
import { getUserDetailByEmail } from '../../api/getUserDetailByEmail.api';
import { dataFile } from '../../utils/dataFile';
import { createUniqueEmail } from '../../utils/createUniqueEmailMethod';
import { createNewUserName } from '../../utils/createNewUserName';
import { randomDay, randomMonth, randomYear } from '../../utils/randomDateOfBirth';

test('API 14: GET user account detail by email', async ({ request }) => {
    const email = createUniqueEmail();
    const name = createNewUserName();
    const day = randomDay();
    const month = randomMonth();
    const year = randomYear();

    await createAccount(request, {
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

    const response = await getUserDetailByEmail(request, email);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toBeDefined();
    expect(body.user).toBeDefined();
    expect(body.user.email).toBe(email);
});
