import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { LogInSignUpPage } from '../../pages/logInSignUp.page';
import { SignUpPage } from '../../pages/signUp.page';
import { AccountCreatedPage } from '../../pages/accountCreated.page';
import { DeleteAccountPage } from '../../pages/deleteAccount.page';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { PaymentPage } from '../../pages/payment.page';
import { dataFile } from '../../utils/dataFile';

test('Place Order: Register before Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    // 1. Launch browser , 2. Navigate to url
    await homePage.navigateToHomePage();
    // 3. Verify that home page is visible successfully
    expect(page.url()).toBe(homePage.baseUrl);
    // 4. Click 'Signup / Login' button
    await homePage.logInSignUpButton.click();
    // 5. Fill all details in Signup and create account
    const logInSignUpPage = new LogInSignUpPage(page);
    const { name } = await logInSignUpPage.signUp();
    const signUpPage = new SignUpPage(page);
    await signUpPage.signUp();
    // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    const accountCreatedPage = new AccountCreatedPage(page);
    await expect(accountCreatedPage.accountCreatedMessage).toBeVisible();
    await accountCreatedPage.continueButton.click();
    // 7. Verify 'Logged in as username' at top
    await expect(homePage.getLoggedInAsLocator(name)).toBeVisible();
    // 8. Add products to cart
    await homePage.productsButton.click();
    const productsPage = new ProductsPage(page);
    await productsPage.firstProductAddToCartButton.click();
    await productsPage.continueShoppingButton.click();
    // 9. Click 'Cart' button
    await productsPage.cartButton.click();
    const cartPage = new CartPage(page);
    // 10. Verify that cart page is displayed
    await expect(cartPage.cartInfoDiv).toBeVisible();
    // 11. Click 'Proceed To Checkout' button
    await cartPage.proceedToCheckoutButton.click();
    await expect(page).toHaveURL(/checkout/);
    // 12. Verify Address Details and Review Your Order
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.deliveryAddress).toBeVisible();
    await expect(checkoutPage.billingAddress).toBeVisible();
    // 13. Enter description in comment text area and click 'Place Order'
    await checkoutPage.commentTextarea.fill('Order placed via automation test');
    await checkoutPage.placeOrderButton.click();
    // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    const paymentPage = new PaymentPage(page);
    await paymentPage.fillPaymentDetails(dataFile.cardName, dataFile.cardNumber, dataFile.cvc, dataFile.expiryMonth, dataFile.expiryYear);
    // 15-16. Verify success message 'Your order has been placed successfully!'
    await expect(paymentPage.successMessage).toBeVisible();
    // 17. Click 'Delete Account' button
    await homePage.deleteAccount();
    // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    const deleteAccountPage = new DeleteAccountPage(page);
    await expect(deleteAccountPage.deleteAccountMessage).toBeVisible();
    await deleteAccountPage.continueButton.click();
});
