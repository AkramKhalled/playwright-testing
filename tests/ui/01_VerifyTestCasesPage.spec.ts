import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

test('Verify Test Cases Page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    expect(page.url()).toBe(homePage.baseUrl);
    await homePage.testCasesButton.click();
    await expect(page).toHaveURL(`${homePage.baseUrl}test_cases`);
});