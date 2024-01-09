import { Builder, By, until, WebDriver } from "selenium-webdriver";
import path from "node:path";

describe("Update class schedule and add admin functionality", () => {
  /**
   * @type {WebDriver}
   */
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    driver.manage().window().maximize();
    await driver.get("http://localhost:3000/signin");
    await driver.findElement(By.id("email")).sendKeys("jason@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("password");
    await driver.findElement(By.xpath("//button[@type='submit']")).click();
    await driver.wait(until.urlIs("http://localhost:3000/"));

    await driver.findElement(By.linkText("Admin")).click();
    await driver.wait(until.urlIs("http://localhost:3000/admin"));
  });

  afterEach(async () => {
    await driver.quit();
  });
  
  it("Should receive success message if a valid class document is uploaded", async () => {
    const classDocument = path.resolve("xml_documents/updateClassSchedule.xml");
    await driver.findElement(By.id("classes")).sendKeys(classDocument);
    await driver.findElement(By.xpath("//button[contains(text(),'Update Schedule')]")).click();
    await driver.wait(until.elementLocated(By.xpath("//span[contains(text(),'Class Schedule successfully updated!')]")));

    const successMessage = await driver.findElement(By.xpath("//span[contains(text(),'Class Schedule successfully updated!')]"))
    expect(successMessage).not.toBeNull();
  })

  it("Should receive success message if a valid admin user document is uploaded", async () => {
    const adminDocument = path.resolve("xml_documents/addAdminUser.xml");
    await driver.findElement(By.id("adminfile")).sendKeys(adminDocument);
    await driver.findElement(By.xpath("//button[contains(text(),'Add New Admin')]")).click();
    await driver.wait(until.elementLocated(By.xpath("//span[contains(text(),'Admin user successfully added!')]")));

    const successMessage = await driver.findElement(By.xpath("//span[contains(text(),'Admin user successfully added!')]"))
    expect(successMessage).not.toBeNull();
  })
})
