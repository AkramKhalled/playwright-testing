import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductsPage } from '../../pages/products.page';

test('View & Cart Brand Products', async ({ page }) => {
    const homePage = new HomePage(page);
    // 1. Launch browser , 2. Navigate to url
    await homePage.navigateToHomePage();
    // 3. Click on 'Products' button
    await homePage.productsButton.click();
    const productsPage = new ProductsPage(page);
    // 4. Verify that Brands are visible on left side bar
    await expect(productsPage.brandsSidebar).toBeVisible();
    // 5. Click on any brand name
    await productsPage.getBrandLink('Polo').click();
    // 6. Verify that user is navigated to brand page and brand products are displayed
    await expect(productsPage.brandPageTitle).toContainText('Polo');
    await expect(productsPage.featuredProductsDiv).toBeVisible();
    // 7. On left side bar, click on any other brand link
    await productsPage.getBrandLink('H&M').click();
    // 8. Verify that user is navigated to that brand page and can see products
    await expect(productsPage.brandPageTitle).toContainText('H&M');
    await expect(productsPage.featuredProductsDiv).toBeVisible();
});
