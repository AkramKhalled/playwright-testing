import { Locator, Page } from "@playwright/test";

export interface CartProduct {
    readonly description: string | null;
    readonly price: string | null;
    readonly quantity: string | null;
    readonly total: string | null;
}

export class CartPage {
    readonly page: Page;
    readonly subscriptionTitle: Locator;
    readonly subscriptionInput: Locator;
    readonly subscriptionButton: Locator;
    readonly subscriptionSuccessMessage: Locator;
    readonly cartInfoDiv: Locator;
    readonly cartTableBody: Locator;
    readonly cartTableRow: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly proceedToRegisterButton: Locator;
    readonly emptyCartMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.subscriptionTitle = page.locator('h2', { hasText: 'Subscription' });
        this.subscriptionInput = page.locator('input[id="susbscribe_email"]');
        this.subscriptionButton = page.locator('button[id="subscribe"]');
        this.subscriptionSuccessMessage = page.locator('div[id="success-subscribe"]');
        this.cartInfoDiv = page.locator('div[id="cart_info"]');
        this.cartTableBody = page.locator('table[id="cart_info_table"] tbody');
        this.cartTableRow = page.locator('table[id="cart_info_table"] tbody tr');
        this.proceedToCheckoutButton = page.locator('a.check_out');
        this.proceedToRegisterButton = page.locator('div.modal-content a[href="/login"]');
        this.emptyCartMessage = page.locator('p[class="text-center"]', { hasText: 'Cart is empty!' });
    }

    getRemoveButton(productId: number): Locator {
        return this.page.locator(`tr[id="product-${productId}"] a[class="cart_quantity_delete"]`);
    }

    async getCartProducts(): Promise<CartProduct[]> {
        const rows = this.cartTableBody.locator('tr');
        const count = await rows.count();
        const products: CartProduct[] = [];
        for (let i = 0; i < count; i++) {
            const product: CartProduct = {
                description: await rows.nth(i).locator('.cart_description').textContent(),
                price: await rows.nth(i).locator('.cart_price').textContent(),
                quantity: await rows.nth(i).locator('.cart_quantity').textContent(),
                total: await rows.nth(i).locator('.cart_total').textContent(),
            };
            products.push(product);
        }
        return products;
    }

}