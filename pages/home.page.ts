import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly baseUrl: string;
  readonly logInSignUpButton: Locator;
  readonly deleteAccountButton: Locator;
  readonly logOutButton: Locator;
  readonly contactUsButton: Locator;
  readonly testCasesButton: Locator;
  readonly productsButton: Locator;
  readonly subscriptionTitle: Locator;
  readonly subscriptionInput: Locator;
  readonly subscriptionButton: Locator;
  readonly subscriptionSuccessMessage: Locator;
  readonly cartButton: Locator;
  readonly firstProductViewProductButton: Locator;
  readonly womenCategoryLink: Locator;
  readonly womenDressLink: Locator;
  readonly menCategoryLink: Locator;
  readonly menTshirtsLink: Locator;
  readonly categoryPageTitle: Locator;
  readonly categorySidebar: Locator;
  readonly recommendedItemsTitle: Locator;
  readonly recommendedItemAddToCartButton: Locator;
  readonly viewCartButton: Locator;
  readonly scrollUpButton: Locator;
  readonly carouselHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL ?? '';

    if (!this.baseUrl) {
      throw new Error('BASE_URL is not defined');
    }

    this.logInSignUpButton = page.locator('ul.nav a[href="/login"]');
    this.deleteAccountButton = page.locator('a[href="/delete_account"]');
    this.logOutButton = page.locator('a[href="/logout"]');
    this.contactUsButton = page.locator('a[href="/contact_us"]');
    this.testCasesButton = page.locator('ul a[href="/test_cases"]');
    this.productsButton = page.locator('ul a[href="/products"]');
    this.subscriptionTitle = page.locator('h2', { hasText: 'Subscription' });
    this.subscriptionInput = page.locator('input[id="susbscribe_email"]');
    this.subscriptionButton = page.locator('button[id="subscribe"]');
    this.subscriptionSuccessMessage = page.locator('div[id="success-subscribe"]');
    this.cartButton = page.locator('ul a[href="/view_cart"]');
    this.firstProductViewProductButton = page.getByRole('link', { name: /view product/i }).first();
    this.womenCategoryLink = page.locator('a[href="#Women"]');
    this.womenDressLink = page.locator('div#Women a', { hasText: 'Dress' });
    this.menCategoryLink = page.locator('a[href="#Men"]');
    this.menTshirtsLink = page.locator('div#Men a', { hasText: 'Tshirts' });
    this.categoryPageTitle = page.locator('h2.title.text-center');
    this.categorySidebar = page.locator('div.left-sidebar');
    this.recommendedItemsTitle = page.getByText('recommended items', { exact: false });
    this.recommendedItemAddToCartButton = page.locator('div#recommended-item-carousel a.add-to-cart').first();
    this.viewCartButton = page.locator('div[id="cartModal"]').getByRole('link', { name: 'View Cart' });
    this.scrollUpButton = page.locator('a[id="scrollUp"]');
    this.carouselHeading = page.locator('div[id="slider-carousel"]');

  }

  getLoggedInAsLocator(name: string): Locator {
    return this.page.getByText(`Logged in as ${name}`);
  }

  async navigateToHomePage() {
    await this.page.route(/(googlesyndication\.com|doubleclick\.net|adservice\.google\.)/, route => route.abort());
    await this.page.goto(this.baseUrl);
  }

  async deleteAccount() {
    await this.deleteAccountButton.click();
  }
}