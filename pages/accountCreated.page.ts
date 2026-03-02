import { Page, Locator, expect } from '@playwright/test';

export class AccountCreatedPage {
    readonly page: Page;
    readonly pageUrl: string;
    readonly accountCreatedMessage: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageUrl = `${process.env.BASE_URL}/account_created`;
        this.accountCreatedMessage = page.getByText('Account Created!');
        this.continueButton = page.locator('a[data-qa="continue-button"]');
    }
}