import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductsPage } from '../../pages/products.page';
import { ProductDetailsPage } from '../../pages/productDetails.page';

test('Verify All Products and Product Details Page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    expect(page.url()).toBe(homePage.baseUrl);
    await homePage.productsButton.click();
    expect(page.url()).toBe(`${homePage.baseUrl}products`);
    const productsPage = new ProductsPage(page);
    await expect(productsPage.featuredProductsDiv).toBeVisible();
    await productsPage.firstProductViewProductButton.click();
    const productDetailsPage = new ProductDetailsPage(page);
    await expect(productDetailsPage.productName).toBeVisible();
    await expect(productDetailsPage.category).toBeVisible();
    await expect(productDetailsPage.price).toBeVisible();
    await expect(productDetailsPage.availability).toBeVisible();
    await expect(productDetailsPage.condition).toBeVisible();
    await expect(productDetailsPage.brand).toBeVisible();
});