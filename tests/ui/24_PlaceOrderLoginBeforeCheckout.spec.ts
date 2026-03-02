import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { LogInSignUpPage } from '../../pages/logInSignUp.page';
import { AccountCreatedPage } from '../../pages/accountCreated.page';
import { DeleteAccountPage } from '../../pages/deleteAccount.page';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { PaymentPage } from '../../pages/payment.page';
import { dataFile } from '../../utils/dataFile';
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

test('Place Order: Login before Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    // 1. Launch browser , 2. Navigate to url
    await homePage.navigateToHomePage();
    // 3. Verify that home page is visible successfully
    expect(page.url()).toBe(homePage.baseUrl);
    // 4. Click 'Signup / Login' button and login
    await homePage.logInSignUpButton.click();
    const logInSignUpPage = new LogInSignUpPage(page);
    await logInSignUpPage.logIn(dataFile.validEmail, dataFile.validPassword);
    // 5. Verify 'Logged in as username' at top
    await expect(homePage.getLoggedInAsLocator(dataFile.validName)).toBeVisible();
    // 6. Add products to cart
    await homePage.productsButton.click();
    const productsPage = new ProductsPage(page);
    await productsPage.firstProductAddToCartButton.click();
    await productsPage.continueShoppingButton.click();
    // 7. Click 'Cart' button
    await productsPage.cartButton.click();
    const cartPage = new CartPage(page);
    // 8. Verify that cart page is displayed
    await expect(cartPage.cartInfoDiv).toBeVisible();
    // 9. Click 'Proceed To Checkout' button
    await cartPage.proceedToCheckoutButton.click();
    await expect(page).toHaveURL(/checkout/);
    // 10. Verify Address Details and Review Your Order
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.deliveryAddress).toBeVisible();
    await expect(checkoutPage.billingAddress).toBeVisible();
    // 11. Enter description in comment text area and click 'Place Order'
    await checkoutPage.commentTextarea.fill('Order placed via automation test');
    await checkoutPage.placeOrderButton.click();
    // 12. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    const paymentPage = new PaymentPage(page);
    await paymentPage.fillPaymentDetails(dataFile.cardName, dataFile.cardNumber, dataFile.cvc, dataFile.expiryMonth, dataFile.expiryYear);
    // 13-14. Verify success message 'Your order has been placed successfully!'
    await expect(paymentPage.successMessage).toBeVisible();
    // 15. Click 'Delete Account' button
    await homePage.deleteAccount();
    // 16. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    const deleteAccountPage = new DeleteAccountPage(page);
    await expect(deleteAccountPage.deleteAccountMessage).toBeVisible();
    await deleteAccountPage.continueButton.click();
});
