import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ContactUsPage } from '../../pages/contactUs.page';
import { dataFile } from '../../utils/dataFile';
import { uploadFile } from '../../utils/uploadFile';

test('Contact Us Form', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    expect(page.url()).toBe(homePage.baseUrl);
    await homePage.contactUsButton.click();
    const contactUsPage = new ContactUsPage(page);
    await expect(contactUsPage.contactUsTitle).toBeVisible();
    await contactUsPage.nameInput.fill(dataFile.validName);
    await contactUsPage.emailInput.fill(dataFile.validEmail);
    await contactUsPage.subjectInput.fill(dataFile.validSubject);
    await contactUsPage.messageInput.fill(dataFile.validMessage);
    await uploadFile(contactUsPage.uploadFileInput, 'utils/gettyimages-2214553975.jpg');
    page.once('dialog', async (dialog) => await dialog.accept());
    await contactUsPage.submitButton.click();
});