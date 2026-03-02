import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { CartPage } from '../../pages/cart.page';

test('Add to cart from Recommended items', async ({ page }) => {
    const homePage = new HomePage(page);
    // 1. Launch browser , 2. Navigate to url
    await homePage.navigateToHomePage();
    // 3. Scroll to bottom of page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // 4. Verify 'RECOMMENDED ITEMS' is visible
    await expect(homePage.recommendedItemsTitle).toBeVisible();
    // 5. Click on 'Add To Cart' on Recommended product
    await homePage.recommendedItemAddToCartButton.click();
    // 6. Click on 'View Cart' button
    await homePage.viewCartButton.click();
    // 7. Verify that product is displayed in cart page
    const cartPage = new CartPage(page);
    const products = await cartPage.getCartProducts();
    expect(products.length).toBeGreaterThan(0);
});
