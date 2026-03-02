import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

test('View Category Products', async ({ page }) => {
    const homePage = new HomePage(page);
    // 1. Launch browser , 2. Navigate to url
    await homePage.navigateToHomePage();
    // 3. Verify that categories are visible on left side bar
    await expect(homePage.categorySidebar).toBeVisible();
    // 4. Click on 'Women' category
    await homePage.womenCategoryLink.click();
    // 5. Click on any category link under 'Women' category (Dress)
    await homePage.womenDressLink.click();
    // 6. Verify that category page is displayed and confirm text
    await expect(homePage.categoryPageTitle).toContainText('Women - Dress Products');
    // 7. Click on any sub category link under 'Men' category
    await homePage.menCategoryLink.click();
    await homePage.menTshirtsLink.click();
    // 8. Verify that user is navigated to that category page
    await expect(homePage.categoryPageTitle).toContainText('Men - Tshirts Products');
});
