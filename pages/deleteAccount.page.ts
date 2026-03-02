import { Page, Locator, expect } from '@playwright/test';

export class DeleteAccountPage {
    readonly page: Page;
    readonly pageUrl: string;
    readonly deleteAccountMessage: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageUrl = `${process.env.BASE_URL}/delete_account`;
        this.deleteAccountMessage = page.getByText('Account Deleted!');
        this.continueButton = page.locator('a[data-qa="continue-button"]');
    }

}