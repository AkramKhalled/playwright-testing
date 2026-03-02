import { Page, Locator, expect } from '@playwright/test';
import { dataFile } from '../utils/dataFile';
import { randomDay, randomMonth, randomYear } from '../utils/randomDateOfBirth';

const dayOfBirth = randomDay();
const monthOfBirth = randomMonth();
const yearOfBirth = randomYear();

export class SignUpPage {

    readonly page: Page;
    readonly pageUrl: string;
    readonly signUpMessage: Locator;
    readonly titleMr: Locator;
    readonly titleMrs: Locator;
    readonly passwordInput: Locator;
    readonly dayOfBirthInput: Locator;
    readonly monthOfBirthInput: Locator;
    readonly yearOfBirthInput: Locator;
    readonly newsletterCheckbox: Locator;
    readonly specialOffersCheckbox: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly address1Input: Locator;
    readonly address2Input: Locator;
    readonly countrySelectOption: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipCodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;



    constructor(page: Page) {

        this.page = page;
        this.pageUrl = `${process.env.BASE_URL}/signup`;
        this.signUpMessage = page.getByText('Enter Account Information');
        this.titleMr = page.locator('input[value="Mr"]');
        this.titleMrs = page.locator('input[value="Mrs"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.dayOfBirthInput = page.locator('select[name="days"]');
        this.monthOfBirthInput = page.locator('select[name="months"]');
        this.yearOfBirthInput = page.locator('select[name="years"]');
        this.newsletterCheckbox = page.locator('input[name="newsletter"]');
        this.specialOffersCheckbox = page.locator('input[name="optin"]');
        this.firstNameInput = page.locator('input[name="first_name"]');
        this.lastNameInput = page.locator('input[name="last_name"]');
        this.companyInput = page.locator('input[name="company"]');
        this.address1Input = page.locator('input[name="address1"]');
        this.address2Input = page.locator('input[name="address2"]');
        this.countrySelectOption = page.locator('select[name="country"]');
        this.stateInput = page.locator('input[name="state"]');
        this.cityInput = page.locator('input[name="city"]');
        this.zipCodeInput = page.locator('input[name="zipcode"]');
        this.mobileNumberInput = page.locator('input[name="mobile_number"]');
        this.createAccountButton = page.locator('button[data-qa="create-account"]');
    }

    async signUp() {
        await this.titleMr.click();
        await this.passwordInput.fill(dataFile.password);
        await this.dayOfBirthInput.click();
        await this.dayOfBirthInput.selectOption({ value: String(dayOfBirth) });
        await this.monthOfBirthInput.click();
        await this.monthOfBirthInput.selectOption({ value: String(monthOfBirth) });
        await this.yearOfBirthInput.click();
        await this.yearOfBirthInput.selectOption({ value: String(yearOfBirth) });
        await this.newsletterCheckbox.click();
        await this.specialOffersCheckbox.click();
        await this.firstNameInput.fill(dataFile.firstName);
        await this.lastNameInput.fill(dataFile.lastName);
        await this.companyInput.fill(dataFile.company);
        await this.address1Input.fill(dataFile.address1);
        await this.address2Input.fill(dataFile.address2);
        await this.countrySelectOption.selectOption({ value: "United States" });
        await this.stateInput.fill(dataFile.state);
        await this.cityInput.fill(dataFile.city);
        await this.zipCodeInput.fill(dataFile.zipCode);
        await this.mobileNumberInput.fill(dataFile.mobileNumber);
        await this.createAccountButton.click();
    }

}