import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';

test('Remove Products From Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    // 1. Launch browser , 2. Navigate to url
    await homePage.navigateToHomePage();
    // 3. Verify that home page is visible successfully
    expect(page.url()).toBe(homePage.baseUrl);
    // 4. Add product to cart
    await homePage.productsButton.click();
    const productsPage = new ProductsPage(page);
    await productsPage.firstProductAddToCartButton.click();
    await productsPage.continueShoppingButton.click();
    // 5. Click 'Cart' button
    await productsPage.cartButton.click();
    const cartPage = new CartPage(page);
    // 6. Verify that cart page is displayed
    await expect(cartPage.cartInfoDiv).toBeVisible();
    // 7. Click 'X' button corresponding to particular product
    await cartPage.getRemoveButton(1).click();
    // 8. Verify that product is removed from the cart
    await expect(cartPage.emptyCartMessage).toBeVisible();
});
