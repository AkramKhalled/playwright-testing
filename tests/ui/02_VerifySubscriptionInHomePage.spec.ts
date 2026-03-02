import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

test('Verify Subscription in Home Page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    expect(page.url()).toBe(homePage.baseUrl);
    await expect(homePage.subscriptionTitle).toBeVisible();
    await homePage.subscriptionInput.fill('test@test.com');
    await homePage.subscriptionButton.click();
    await expect(homePage.subscriptionSuccessMessage).not.toHaveClass('hide');
});