import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { LogInSignUpPage } from '../../pages/logInSignUp.page';
import { AccountCreatedPage } from '../../pages/accountCreated.page';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';
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

test('Search Products and Verify Cart After Login', async ({ page }) => {
    const homePage = new HomePage(page);
    // 1. Launch browser , 2. Navigate to url
    await homePage.navigateToHomePage();
    // 3. Click on 'Products' button
    await homePage.productsButton.click();
    const productsPage = new ProductsPage(page);
    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(productsPage.featuredProductsDiv).toBeVisible();
    // 5. Enter product name in search input and click search button
    await productsPage.searchProductInput.fill('Top');
    await productsPage.searchProductButton.click();
    // 6. Verify 'SEARCHED PRODUCTS' is visible
    await expect(productsPage.searchProductTitle).toBeVisible();
    // 7. Verify all the products related to search are visible
    const productCount = await productsPage.allProductCards.count();
    expect(productCount).toBeGreaterThan(0);
    // 8. Add those products to cart
    for (let i = 0; i < productCount; i++) {
        await productsPage.allProductCards.nth(i).locator('a.add-to-cart').first().click();
        await productsPage.continueShoppingButton.click();
    }
    // 9. Click 'Cart' button and verify that products are visible in cart
    await productsPage.cartButton.click();
    const cartPage = new CartPage(page);
    const cartProductsBefore = await cartPage.getCartProducts();
    expect(cartProductsBefore.length).toBe(productCount);
    // 10. Click 'Signup / Login' button and submit login details
    await homePage.logInSignUpButton.click();
    const logInSignUpPage = new LogInSignUpPage(page);
    await logInSignUpPage.logIn(dataFile.validEmail, dataFile.validPassword);
    // 11. Again, go to Cart page
    await homePage.cartButton.click();
    // 12. Verify that those products are visible in cart after login as well
    const cartProductsAfter = await cartPage.getCartProducts();
    expect(cartProductsAfter.length).toBe(productCount);
});
