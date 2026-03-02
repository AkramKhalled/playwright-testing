import { Locator, Page } from "@playwright/test";

export class PaymentPage {
    readonly page: Page;
    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expiryMonthInput: Locator;
    readonly expiryYearInput: Locator;
    readonly payButton: Locator;
    readonly successMessage: Locator;
    readonly downloadInvoiceButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
        this.cardNumberInput = page.locator('input[data-qa="card-number"]');
        this.cvcInput = page.locator('input[data-qa="cvc"]');
        this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
        this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
        this.payButton = page.locator('button[data-qa="pay-button"]');
        this.successMessage = page.getByText('Congratulations! Your order has been confirmed!');
        this.downloadInvoiceButton = page.getByRole('link', { name: 'Download Invoice' });
        this.continueButton = page.locator('a[data-qa="continue-button"]');
    }

    async fillPaymentDetails(cardName: string, cardNumber: string, cvc: string, expiryMonth: string, expiryYear: string) {
        await this.nameOnCardInput.fill(cardName);
        await this.cardNumberInput.fill(cardNumber);
        await this.cvcInput.fill(cvc);
        await this.expiryMonthInput.fill(expiryMonth);
        await this.expiryYearInput.fill(expiryYear);
        await this.payButton.click();
    }
}
