import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

test('Verify Scroll Up without Arrow button and Scroll Down functionality', async ({ page }) => {
    const homePage = new HomePage(page);
    // 1. Launch browser , 2. Navigate to url
    await homePage.navigateToHomePage();
    // 3. Verify that home page is visible successfully
    expect(page.url()).toBe(homePage.baseUrl);
    // 4. Scroll down page to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // 5. Verify 'SUBSCRIPTION' is visible
    await expect(homePage.subscriptionTitle).toBeVisible();
    // 6. Scroll up page to top
    await page.evaluate(() => window.scrollTo(0, 0));
    // 7. Verify that page is scrolled up and text is visible on screen
    await expect(homePage.carouselHeading).toBeVisible();
});
