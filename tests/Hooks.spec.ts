import { test } from '@playwright/test';

import { HomePage } from "../Pages/HomePage";

let homepage: HomePage;


test.describe("Search for iphone16 and شdd Product to cart ", ()=> {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://btech.com/ar/");
    homepage = new HomePage(page);
  });
  
  test("Search for iphone16 and add Product to cart ", async () => {
      await homepage.searchForProduct("iphone16");
      await homepage.addProductToCard();  
        
  });  



});

