import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { LogInSignUpPage } from '../../pages/logInSignUp.page';
import { dataFile } from '../../utils/dataFile';
import { AccountCreatedPage } from '../../pages/accountCreated.page';
import { signUpWithValidData } from '../../utils/signUpWithValidData';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.logInSignUpButton.click();
    const logInSignUpPage = new LogInSignUpPage(page);
    await logInSignUpPage.signUpemailInput.fill(dataFile.validEmail);
    await logInSignUpPage.nameInput.fill(dataFile.validName);
    await logInSignUpPage.signUpButton.click();
    let emailAlreadyExists = false;
    try {
        await logInSignUpPage.existingEmailMessage.waitFor({ state: 'visible', timeout: 2000 });
        emailAlreadyExists = true;
    } catch {
        emailAlreadyExists = false;
    }
    if (emailAlreadyExists) {
        return;
    }
    await signUpWithValidData(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    await accountCreatedPage.continueButton.click();
    await homePage.logOutButton.click();
});


test('Logout User', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    expect(page.url()).toBe(homePage.baseUrl);
    await homePage.logInSignUpButton.click();
    const logInSignUpPage = new LogInSignUpPage(page);
    await expect(logInSignUpPage.logInMessage).toBeVisible();
    await logInSignUpPage.logIn(dataFile.validEmail, dataFile.validPassword);
    await expect(homePage.getLoggedInAsLocator(dataFile.validName)).toBeVisible();
    await homePage.logOutButton.click();
    expect(page.url()).toBe(`${homePage.baseUrl}login`);
});