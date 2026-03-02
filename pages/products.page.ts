import { Locator, Page } from "@playwright/test";

export class ProductsPage {
    readonly page: Page;
    readonly pageUrl: string;
    readonly featuredProductsDiv: Locator;
    readonly firstProductViewProductButton: Locator;
    readonly searchProductInput: Locator;
    readonly searchProductButton: Locator;
    readonly searchProductTitle: Locator;
    readonly foundProductName: Locator;
    readonly firstProductAddToCartButton: Locator;
    readonly secondProductAddToCartButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly cartButton: Locator;
    readonly viewCartButton: Locator;
    readonly brandsSidebar: Locator;
    readonly brandPageTitle: Locator;
    readonly allProductCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageUrl = `${process.env.BASE_URL}/products`;
        this.featuredProductsDiv = page.locator('div[class="features_items"]');
        this.firstProductViewProductButton = page.getByRole('link', { name: /view product/i }).first();
        this.searchProductInput = page.getByPlaceholder('Search Product');
        this.searchProductButton = page.locator('button[id="submit_search"]');
        this.searchProductTitle = page.getByText('Searched Products');
        this.foundProductName = page.locator('div[class="productinfo text-center"]').locator('p');
        this.firstProductAddToCartButton = page.locator('a[data-product-id="1"]').first();
        this.secondProductAddToCartButton = page.locator('a[data-product-id="2"]').first();
        this.continueShoppingButton = page.locator('div[id="cartModal"]').getByRole('button', { name: 'Continue Shopping' });
        this.cartButton = page.locator('ul a[href="/view_cart"]');
        this.viewCartButton = page.locator('div[id="cartModal"]').getByRole('link', { name: 'View Cart' });
        this.brandsSidebar = page.locator('div.brands_products');
        this.brandPageTitle = page.locator('h2.title.text-center');
        this.allProductCards = page.locator('div.features_items div.col-sm-4');
    }

    getBrandLink(brandName: string): Locator {
        return this.page.locator('div.brands_products a', { hasText: brandName });
    }
}