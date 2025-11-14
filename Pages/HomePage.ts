import { type Page, type Locator, expect } from "@playwright/test"

export class HomePage {
  readonly page: Page;
  readonly openFormPageIcon: Locator;
  readonly formItem: Locator;
  readonly createNewFormButton: Locator;
  readonly formName: Locator;
  readonly formDescriptionP: Locator;
  readonly formDescription: Locator;
  readonly formFieldShortText: Locator;
  readonly formFieldLongText: Locator;
  readonly formFieldCheckbox: Locator;
  readonly formFieldDate: Locator;
  readonly formFieldList: Locator;
  readonly formFieldNumber: Locator;
  readonly fieldName: Locator;
  readonly fieldDescription: Locator;
  readonly fieldRequired: Locator;
  readonly saveButton: Locator;
  readonly previewFormButton: Locator;
  readonly ticketPreviewTitel: Locator;
  readonly ticketFormFields: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.openFormPageIcon = this.page.getByTestId('navigation_formsandlists');
    this.formItem = this.page.getByTestId('navigation_forms');
    this.createNewFormButton = this.page.getByTestId('Setup_Forms_CreateNewForm');
    this.formName = this.page.getByTestId('Setup_Forms_FormName');
    this.formDescriptionP = this.page.locator("//p[text()='Enter form description']");
    this.formDescription = this.page.getByTestId('Setup_Forms_FormDescription');
    this.formFieldShortText = this.page.getByTestId('ticket_type_form_field_Short Text');
    this.formFieldLongText = this.page.getByTestId('ticket_type_form_field_Long Text');
    this.formFieldCheckbox = this.page.getByTestId('ticket_type_form_field_Checkbox');
    this.formFieldDate= this.page.getByTestId('ticket_type_form_field_Date');
    this.formFieldList = this.page.getByTestId('ticket_type_form_field_List');
    this.formFieldNumber = this.page.getByTestId('ticket_type_form_field_Number');
    this.fieldName = this.page.locator('//textarea[@name="name"]');
    this.fieldDescription = this.page.locator('//textarea[@name="description"]');
    this.fieldRequired = this.page.locator('//label[@data-id="Setup_Forms_project name_Mandatory"]'); 
    this.saveButton = this.page.getByTestId('Save'); 
    this.previewFormButton = this.page.getByTestId('Preview form');
    this.ticketPreviewTitel = this.page.locator("//p[text()='Ticket Preview']"); 
    this.ticketFormFields = this.page.getByTestId(/ticket_form_field_/); 
    
  }
  async openFormPage() {
    await this.openFormPageIcon.click();
    await this.formItem.waitFor({ state: "visible" });
    await this.formItem.click();
    await this.page.waitForResponse(
      (res) =>
        res.url().includes("/api/v2/1483947/ticket_types") && res.status() === 200
    );

  }
  async addNewfield(field:Locator , fieldName: string , fieldDescription:string,required?:boolean ){
    await field.click();
    await field.last().waitFor({ state: "visible" });
    await this.fieldName.last().waitFor({ state: "visible" });
    await this.fieldDescription.last().waitFor({ state: "visible" });
    await this.fieldName.last().fill(fieldName);
    await this.fieldDescription.last().fill(fieldDescription);
    if(required)
      await this.fieldRequired.check();
    await this.saveButton.click();
    await this.page.waitForResponse(
      (res) =>
        res.url().includes("/api/v2/1483947/ticket_types") && res.status() === 200
    );
    
    await this.page.waitForSelector("//p[text()='Data changed']", { state: 'visible' });
    await expect(this.page.getByTestId(`ticket_type_form_field_${fieldName}`)).toBeVisible();

  }
  async addNewForm() {
    await this.createNewFormButton.waitFor({ state: "visible" });
    await this.createNewFormButton.click();
    await this.page.waitForResponse(
      (res) =>
        res.url().includes("/api/v2/1483947/ticket_types/load_ticket_type_fields") && res.status() === 200
    );
    await this.formName.fill("form1 ");
    await this.formDescriptionP.click();
    await this.formDescription.waitFor({ state: "visible" });
    await this.formDescription.fill("form1 for test automation ")
    await this.addNewfield(this.formFieldShortText,"project name","add project name",true);
    await this.addNewfield(this.formFieldLongText,"project Description","descrip project ");
    await this.addNewfield(this.formFieldCheckbox,"is this first project","check if this first project");
    await this.addNewfield(this.formFieldDate,"project start date","start project date ");
    await this.addNewfield(this.formFieldList,"project type","Types of project");
    await this.addNewfield(this.formFieldNumber,"project number","enter project number");
    await this.previewFormButton.click();
    await this.ticketPreviewTitel.waitFor({ state: "visible" }); 

  }


}


