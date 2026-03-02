import { Page, Locator, expect } from '@playwright/test';

import { createUniqueEmail } from '../utils/createUniqueEmailMethod';
import { createNewUserName } from '../utils/createNewUserName';

export class LogInSignUpPage {
    readonly page: Page;
    readonly pageUrl: string;
    readonly logInemailInput: Locator;
    readonly signUpemailInput: Locator;
    readonly passwordInput: Locator;
    readonly nameInput: Locator;
    readonly newUserMessage: Locator;
    readonly signUpButton: Locator;
    readonly loginButton: Locator;
    readonly signUpForm: Locator;
    readonly logInMessage: Locator;
    readonly errorMessage: Locator;
    readonly existingEmailMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.signUpForm = page.locator('form[action="/signup"]');
        this.pageUrl = `${process.env.BASE_URL}/login`;
        this.logInemailInput = page.locator('form[action="/login"]').locator('input[name="email"]');
        this.signUpemailInput = page.locator('form[action="/signup"]').locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.nameInput = page.locator('input[name="name"]');
        this.newUserMessage = page.getByText('New User Signup!');
        this.logInMessage = page.getByText('Login to your account');
        this.signUpButton = page.locator('form[action="/signup"]').locator('button[type="submit"]');
        this.loginButton = page.locator('form[action="/login"]').locator('button[type="submit"]');
        this.errorMessage = page.getByText('Your email or password is incorrect!');
        this.existingEmailMessage = page.getByText('Email Address already exist!');
    }

    async logIn(email: string, password: string) {
        await this.logInemailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async signUp() {
        const email = createUniqueEmail();
        const name = createNewUserName();
        await this.signUpemailInput.fill(email);
        await this.nameInput.fill(name);
        await this.signUpButton.click();
        return { email, name };
    }
}