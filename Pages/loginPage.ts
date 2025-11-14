import { type Page, type Locator, expect } from "@playwright/test";

export class LoginPage {
  // Initialization
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly continueButton: Locator;
  readonly dashboardTitel: Locator;


  // Constructor
  constructor(page: Page) {
    this.page = page;
    this.email = page.locator("#email");
    this.password = page.locator("#password");
    this.loginButton = page.locator("//button[text()='Login']");
    this.continueButton = page.locator("//button[text()='Continue']");
    this.dashboardTitel = page.locator("//div[@id='dashboard']//h5");
   
  }
  async navigateToLogin() {
    await this.page.goto("https://www.planradar.com/login");
    await this.email.waitFor({ state: "visible" });
  }
  async checkMail() {
    await this.email.fill("rofidamaher97@gmail.com");
    await this.continueButton.click();
    await this.page.waitForResponse(
      (res) =>
        res.url().includes("/api/account/check_mail") && res.status() === 200
    );
  }
  async fillPasswordAndLogin() {
    await this.checkMail();
    await this.password.waitFor({ state: "visible" });
    await this.password.fill("rofa47523*");
    await this.loginButton.click();
    await this.page.waitForResponse(
      (res) =>
        res.url().includes("/api/v2/1483947/projects/my_projects") && res.status() === 200
    );
    await this.dashboardTitel.first().waitFor({ state: "visible" });
    await expect(this.dashboardTitel.first()).toHaveText("Dashboard");
  }
}
