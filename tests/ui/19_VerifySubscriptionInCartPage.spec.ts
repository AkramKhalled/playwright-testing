import { test, expect } from '@playwright/test';
import { CartPage } from '../../pages/cart.page';
import { HomePage } from '../../pages/home.page';

test('Verify Subscription in Cart Page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    expect(page.url()).toBe(homePage.baseUrl);
    await homePage.cartButton.click();
    const cartPage = new CartPage(page);
    await expect(cartPage.subscriptionTitle).toBeVisible();
    await cartPage.subscriptionInput.fill('test@test.com');
    await cartPage.subscriptionButton.click();
    await expect(cartPage.subscriptionSuccessMessage).not.toHaveClass('hide');
});