import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly deliveryAddress: Locator;
    readonly billingAddress: Locator;
    readonly commentTextarea: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.deliveryAddress = page.locator('#address_delivery');
        this.billingAddress = page.locator('#address_invoice');
        this.commentTextarea = page.locator('textarea[name="message"]');
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
    }
}
