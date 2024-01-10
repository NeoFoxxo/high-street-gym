import { Builder, By, until, WebDriver } from "selenium-webdriver";

describe("E2E Sign up functionality", () => {
  /**
   * @type {WebDriver}
   */
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/signup");
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("Should redirect to home page on successful sign up", async () => {
    await driver.findElement(By.id("username")).sendKeys("testuser");
    await driver.findElement(By.id("email")).sendKeys("test@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("password");
    await driver.findElement(By.xpath("//button[@type='submit']")).click();

    await driver.wait(until.urlIs("http://localhost:3000/"), 2000);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe("http://localhost:3000/");
  });
  
})