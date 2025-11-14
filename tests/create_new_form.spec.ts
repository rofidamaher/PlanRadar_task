import { test } from '@playwright/test';
import { HomePage } from "../Pages/HomePage";
import { LoginPage } from "../Pages/loginPage";
let homepage: HomePage;
let loginPage: LoginPage;


test.describe("create new form and add fields", ()=> {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homepage = new HomePage(page);
    loginPage.navigateToLogin();
  });
  
  test("navigate to login page and enter email and password then login ", async () => {
    await loginPage.fillPasswordAndLogin();   
        
  }); 
  test("create new form and add fields ", async () => {
    await loginPage.fillPasswordAndLogin();
    await homepage.openFormPage(); 
    await homepage.addNewForm();   
        
  });  


});

