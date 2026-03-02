import { Locator, Page } from "@playwright/test";

export class ContactUsPage {
    readonly page: Page;
    readonly pageUrl: string;
    readonly contactUsTitle: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageInput: Locator;
    readonly submitButton: Locator;
    readonly uploadFileInput: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageUrl = `${process.env.BASE_URL}/contact_us`;
        this.contactUsTitle = page.getByText('Get In Touch');
        this.nameInput = page.locator('input[name="name"]');
        this.emailInput = page.locator('input[name="email"]');
        this.subjectInput = page.locator('input[name="subject"]');
        this.messageInput = page.getByPlaceholder('Your Message Here');
        this.submitButton = page.locator('input[name="submit"]');
        this.uploadFileInput = page.locator('input[name="upload_file"]');
        this.successMessage = page.getByText('Success! Your details have been submitted successfully.');
    }
}