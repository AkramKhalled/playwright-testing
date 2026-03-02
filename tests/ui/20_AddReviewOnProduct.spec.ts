import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ProductsPage } from '../../pages/products.page';
import { ProductDetailsPage } from '../../pages/productDetails.page';
import { dataFile } from '../../utils/dataFile';

test('Add review on product', async ({ page }) => {
    const homePage = new HomePage(page);
    // 1. Launch browser , 2. Navigate to url
    await homePage.navigateToHomePage();
    // 3. Click on 'Products' button
    await homePage.productsButton.click();
    const productsPage = new ProductsPage(page);
    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(productsPage.featuredProductsDiv).toBeVisible();
    // 5. Click on 'View Product' button
    await productsPage.firstProductViewProductButton.click();
    const productDetailsPage = new ProductDetailsPage(page);
    // 6. Verify 'Write Your Review' is visible
    await expect(productDetailsPage.writeYourReviewTitle).toBeVisible();
    // 7. Enter name, email and review
    await productDetailsPage.reviewNameInput.fill(dataFile.validName);
    await productDetailsPage.reviewEmailInput.fill(dataFile.validEmail);
    await productDetailsPage.reviewTextarea.fill('This is a great product!');
    // 8. Click 'Submit' button
    await productDetailsPage.reviewSubmitButton.click();
    // 9. Verify success message 'Thank you for your review.'
    await expect(productDetailsPage.reviewSuccessMessage).toBeVisible();
});
