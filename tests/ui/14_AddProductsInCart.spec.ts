import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';

test('Add Products in Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    expect(page.url()).toBe(homePage.baseUrl);
    await homePage.productsButton.click();
    const productsPage = new ProductsPage(page);
    await productsPage.firstProductAddToCartButton.click();
    await productsPage.continueShoppingButton.click();
    await productsPage.secondProductAddToCartButton.click();
    await productsPage.continueShoppingButton.click();
    await productsPage.cartButton.click();
    const cartPage = new CartPage(page);
    const products = await cartPage.getCartProducts();
    expect(products.length).toBe(2);
    expect(products[0].description).not.toBeNull();
    expect(products[0].price).not.toBeNull();
    expect(products[0].quantity).not.toBeNull();
    expect(products[0].total).not.toBeNull();
    expect(products[1].description).not.toBeNull();
    expect(products[1].price).not.toBeNull();
    expect(products[1].quantity).not.toBeNull();
    expect(products[1].total).not.toBeNull();
});