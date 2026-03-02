import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { LogInSignUpPage } from '../../pages/logInSignUp.page';
import { SignUpPage } from '../../pages/signUp.page';
import { AccountCreatedPage } from '../../pages/accountCreated.page';
import { DeleteAccountPage } from '../../pages/deleteAccount.page';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { dataFile } from '../../utils/dataFile';

test('Verify address details in checkout page', async ({ page }) => {
    const homePage = new HomePage(page);
    // 1. Launch browser , 2. Navigate to url
    await homePage.navigateToHomePage();
    // 3. Verify that home page is visible successfully
    expect(page.url()).toBe(homePage.baseUrl);
    // 4. Click 'Signup / Login' button
    await homePage.logInSignUpButton.click();
    // 5. Fill all details in Signup and create account
    const logInSignUpPage = new LogInSignUpPage(page);
    await logInSignUpPage.signUp();
    const signUpPage = new SignUpPage(page);
    await signUpPage.signUp();
    // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    const accountCreatedPage = new AccountCreatedPage(page);
    await expect(accountCreatedPage.accountCreatedMessage).toBeVisible();
    await accountCreatedPage.continueButton.click();
    // 7. Add products to cart
    await homePage.productsButton.click();
    const productsPage = new ProductsPage(page);
    await productsPage.firstProductAddToCartButton.click();
    await productsPage.continueShoppingButton.click();
    // 8. Click 'Cart' button
    await productsPage.cartButton.click();
    const cartPage = new CartPage(page);
    // 9. Verify that cart page is displayed
    await expect(cartPage.cartInfoDiv).toBeVisible();
    // 10. Click 'Proceed To Checkout' button
    await cartPage.proceedToCheckoutButton.click();
    await expect(page).toHaveURL(/checkout/);
    // 11. Verify that the delivery address is same address filled at the time registration of account
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.deliveryAddress).toContainText(dataFile.address1);
    await expect(checkoutPage.deliveryAddress).toContainText(dataFile.city);
    await expect(checkoutPage.deliveryAddress).toContainText(dataFile.zipCode);
    await expect(checkoutPage.deliveryAddress).toContainText(dataFile.mobileNumber);
    // 12. Verify that the billing address is same address filled at the time registration of account
    await expect(checkoutPage.billingAddress).toContainText(dataFile.address1);
    await expect(checkoutPage.billingAddress).toContainText(dataFile.city);
    await expect(checkoutPage.billingAddress).toContainText(dataFile.zipCode);
    await expect(checkoutPage.billingAddress).toContainText(dataFile.mobileNumber);
    // 13. Click 'Delete Account' button
    await homePage.deleteAccount();
    // 14. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    const deleteAccountPage = new DeleteAccountPage(page);
    await expect(deleteAccountPage.deleteAccountMessage).toBeVisible();
    await deleteAccountPage.continueButton.click();
});
