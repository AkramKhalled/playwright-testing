import { test, expect } from '@playwright/test';
import { CartPage } from '../../pages/cart.page';
import { HomePage } from '../../pages/home.page';
import { ProductDetailsPage } from '../../pages/productDetails.page';

test('Verify Product Quantity in Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    // 1. Launch browser , 2. Navigate to url
    await homePage.navigateToHomePage();
    // 3. Verify that home page is visible successfully
    expect(page.url()).toBe(homePage.baseUrl);
    // 4. Click 'View Product' for any product on home page
    await homePage.firstProductViewProductButton.click();
    const productDetailsPage = new ProductDetailsPage(page);
    // 5. Verify product detail is opened
    await expect(productDetailsPage.productInfoDiv).toBeVisible();
    // 6. Increase quantity to 4
    await productDetailsPage.quantityInput.clear();
    await productDetailsPage.quantityInput.fill('4');
    // 7. Click 'Add to cart' button
    await productDetailsPage.addToCartButton.click();
    // 8. Click 'View Cart' button
    await productDetailsPage.viewCartButton.click();
    // 9. Verify that product is displayed in cart page with exact quantity
    const cartPage = new CartPage(page);
    const products = await cartPage.getCartProducts();
    expect(products.length).toBe(1);
    expect(products[0].quantity).toContain('4');
});
