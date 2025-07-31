import { type Page, type Locator, expect } from "@playwright/test"

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly productImg: Locator;
  readonly openProudect: Locator;
  readonly addProudectBtn: Locator;
  readonly addProudectMess: Locator;
  readonly goToCardPageBtn: Locator;
  readonly cardProudect: Locator;


  constructor(page: Page) {
    this.page = page;
    this.searchInput = this.page.locator('#search');
    this.productImg = this.page.locator('//img[@class="product-image-photo"]');
    this.openProudect = this.page.locator('#product_view_0');
    this.addProudectBtn = this.page.locator('#product-addtocart-button');
    this.addProudectMess = this.page.locator('text=ضفنا المنتج لمشترياتك');
    this.goToCardPageBtn = this.page.locator('text=شوف مشترياتك');
    this.cardProudect = this.page.locator('a:has-text("ايفون 16 ")');



  }
  async searchForProduct(productName) {

    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(productName);
    await this.searchInput.press('Enter');
    await expect(this.productImg).toBeVisible();

  }
  async addProductToCard() {

    await expect(this.openProudect).toBeVisible();
    await this.openProudect.click();
    await expect(this.addProudectBtn).toBeVisible();
    await this.addProudectBtn.click();
    await expect(this.goToCardPageBtn).toBeVisible();
    await expect(this.addProudectMess).toBeVisible();
    await this.goToCardPageBtn.click();
    await expect(this.page.url()).toContain('/checkout/cart');
    await expect(this.cardProudect).toBeVisible();


  }



}


