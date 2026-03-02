import { Page } from '@playwright/test';
import { SignUpPage } from '../pages/signUp.page';
import { dataFile } from './dataFile';
import { randomDay, randomMonth, randomYear } from './randomDateOfBirth';

export async function signUpWithValidData(page: Page): Promise<void> {
    const signUpPage = new SignUpPage(page);
    const dayOfBirth = randomDay();
    const monthOfBirth = randomMonth();
    const yearOfBirth = randomYear();

    await signUpPage.titleMr.click();
    await signUpPage.passwordInput.fill(dataFile.validPassword);
    await signUpPage.dayOfBirthInput.click();
    await signUpPage.dayOfBirthInput.selectOption({ value: String(dayOfBirth) });
    await signUpPage.monthOfBirthInput.click();
    await signUpPage.monthOfBirthInput.selectOption({ value: String(monthOfBirth) });
    await signUpPage.yearOfBirthInput.click();
    await signUpPage.yearOfBirthInput.selectOption({ value: String(yearOfBirth) });
    await signUpPage.newsletterCheckbox.click();
    await signUpPage.specialOffersCheckbox.click();
    await signUpPage.firstNameInput.fill(dataFile.validName);
    await signUpPage.lastNameInput.fill(dataFile.validName);
    await signUpPage.companyInput.fill(dataFile.company);
    await signUpPage.address1Input.fill(dataFile.address1);
    await signUpPage.address2Input.fill(dataFile.address2);
    await signUpPage.countrySelectOption.selectOption({ value: 'United States' });
    await signUpPage.stateInput.fill(dataFile.state);
    await signUpPage.cityInput.fill(dataFile.city);
    await signUpPage.zipCodeInput.fill(dataFile.zipCode);
    await signUpPage.mobileNumberInput.fill(dataFile.mobileNumber);
    await signUpPage.createAccountButton.click();
}
