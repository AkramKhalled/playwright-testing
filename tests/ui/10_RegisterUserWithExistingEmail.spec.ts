import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { LogInSignUpPage } from '../../pages/logInSignUp.page';
import { dataFile } from '../../utils/dataFile';

test('Register User with existing email', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    expect(page.url()).toBe(homePage.baseUrl);
    await homePage.logInSignUpButton.click();
    const logInSignUpPage = new LogInSignUpPage(page);
    await expect(logInSignUpPage.newUserMessage).toBeVisible();
    await logInSignUpPage.signUpemailInput.fill(dataFile.validEmail);
    await logInSignUpPage.nameInput.fill(dataFile.validName);
    await logInSignUpPage.signUpButton.click();
    await expect(logInSignUpPage.existingEmailMessage).toBeVisible();
});