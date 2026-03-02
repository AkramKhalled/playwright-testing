import { Locator, Page } from "@playwright/test";

export class ProductDetailsPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly category: Locator;
    readonly price: Locator;
    readonly availability: Locator;
    readonly condition: Locator;
    readonly brand: Locator;
    readonly productInfoDiv: Locator;
    readonly quantityInput: Locator;
    readonly addToCartButton: Locator;
    readonly viewCartButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly writeYourReviewTitle: Locator;
    readonly reviewNameInput: Locator;
    readonly reviewEmailInput: Locator;
    readonly reviewTextarea: Locator;
    readonly reviewSubmitButton: Locator;
    readonly reviewSuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        const productInfo = page.locator('div.product-information');
        this.productName = productInfo.locator('h2');
        this.category = page.locator('p', { hasText: 'Category' });
        this.price = page.locator('span span', { hasText: 'Rs.' });
        this.availability = page.locator('p', { hasText: 'Availability' });
        this.condition = page.locator('p', { hasText: 'Condition' });
        this.brand = page.locator('p', { hasText: 'Brand' });
        this.productInfoDiv = productInfo;
        this.quantityInput = page.locator('input[id="quantity"]');
        this.addToCartButton = page.locator('button[type="button"]');
        this.viewCartButton = page.locator('div[class="modal-content"] a[href="/view_cart"]');
        this.continueShoppingButton = page.locator('div[id="cartModal"]').getByRole('button', { name: 'Continue Shopping' });
        this.writeYourReviewTitle = page.getByText('Write Your Review');
        this.reviewNameInput = page.locator('input[id="name"]');
        this.reviewEmailInput = page.locator('input[id="email"]');
        this.reviewTextarea = page.locator('textarea[id="review"]');
        this.reviewSubmitButton = page.locator('button[id="button-review"]');
        this.reviewSuccessMessage = page.getByText('Thank you for your review.');
    }
}