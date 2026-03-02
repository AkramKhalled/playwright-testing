import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { LogInSignUpPage } from '../../pages/logInSignUp.page';
import { dataFile } from '../../utils/dataFile';

test('Login User with invalid email and password', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    expect(page.url()).toBe(homePage.baseUrl);
    await homePage.logInSignUpButton.click();
    const logInSignUpPage = new LogInSignUpPage(page);
    await expect(logInSignUpPage.logInMessage).toBeVisible();
    await logInSignUpPage.logIn(dataFile.invalidEmail, dataFile.invalidPassword);
    await expect(logInSignUpPage.errorMessage).toBeVisible();
});