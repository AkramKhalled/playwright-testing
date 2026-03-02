import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page.ts';
import { ProductsPage } from '../../pages/products.page';

test('Search Product', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    expect(page.url()).toBe(homePage.baseUrl);
    await homePage.productsButton.click();
    expect(page.url()).toBe(`${homePage.baseUrl}products`);
    const productsPage = new ProductsPage(page);
    await productsPage.searchProductInput.fill('Sleeveless Dress');
    await productsPage.searchProductButton.click();
    const foundProductName = await productsPage.foundProductName.textContent();
    expect(foundProductName).toBe('Sleeveless Dress');
});