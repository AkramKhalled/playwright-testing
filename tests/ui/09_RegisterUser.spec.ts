import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { LogInSignUpPage } from '../../pages/logInSignUp.page';
import { SignUpPage } from '../../pages/signUp.page';
import { AccountCreatedPage } from '../../pages/accountCreated.page';
import { DeleteAccountPage } from '../../pages/deleteAccount.page';

test('Register User', async ({ page }) => {
    const homePage = new HomePage(page);
    // 1. Launch browser , 2. Navigate to url
    await homePage.navigateToHomePage();
    // 3. Verify that home page is visible successfully
    await expect(homePage.logInSignUpButton).toBeVisible();
    expect(page.url()).toBe(homePage.baseUrl);
    // 4. Click on 'Signup / Login' button
    await homePage.logInSignUpButton.click();
    const logInSignUpPage = new LogInSignUpPage(page);
    // 5. Verify 'New User Signup!' is visible
    await expect(logInSignUpPage.newUserMessage).toBeVisible();
    // 6. Enter name and email address, 7. Click 'Signup' button
    const { email, name } = await logInSignUpPage.signUp();
    const signUpPage = new SignUpPage(page);
    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(signUpPage.signUpMessage).toBeVisible();
    // 9–12. Fill details (Title, Name, Email, Password, DOB, checkboxes, address, etc.), 13. Click 'Create Account' button
    await signUpPage.signUp();
    const accountCreatedPage = new AccountCreatedPage(page);
    // 14. Verify that 'ACCOUNT CREATED!' is visible
    await expect(accountCreatedPage.accountCreatedMessage).toBeVisible();
    // 15. Click 'Continue' button
    await accountCreatedPage.continueButton.click();
    // 16. Verify that 'Logged in as username' is visible
    await expect(homePage.getLoggedInAsLocator(name)).toBeVisible();
    // 17. Click 'Delete Account' button
    await homePage.deleteAccount();
    const deleteAccountPage = new DeleteAccountPage(page);
    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await expect(deleteAccountPage.deleteAccountMessage).toBeVisible();
    await deleteAccountPage.continueButton.click();
});