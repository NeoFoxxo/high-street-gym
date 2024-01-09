import { Builder, By, until, WebDriver } from "selenium-webdriver";

describe("E2E Signin functionality", () => {
  /**
   * @type {WebDriver}
   */
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/signin");
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("Should show error message if password is not provided", async () => {
    await driver.findElement(By.id("email")).sendKeys("testo@test.com");
    await driver.findElement(By.xpath("//button[@type='submit']")).click();
    const errorText = await driver.findElement(By.className("text-error")).getText()
    expect(errorText).toBe("Password Required");
  })

  it("Should show error message if email is not provided", async () => {
    await driver.findElement(By.id("password")).sendKeys("password");
    await driver.findElement(By.xpath("//button[@type='submit']")).click();
    const errorText = await driver.findElement(By.className("text-error")).getText()
    expect(errorText).toBe("Email Required");
  })

  it("Should show error message if no text is provided", async () => {
    await driver.findElement(By.xpath("//button[@type='submit']")).click();
    const emailError = await driver.findElement(By.xpath("//*[contains(text(),'Email Required')]")).getText();
    const passwordError = await driver.findElement(By.xpath("//*[contains(text(),'Password Required')]")).getText();
    expect(emailError).toBe("Email Required");
    expect(passwordError).toBe("Password Required");
  })

  it("Should redirect to home page on successful login", async () => {
    await driver.findElement(By.id("email")).sendKeys("jason@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("password");
    await driver.findElement(By.xpath("//button[@type='submit']")).click();

    await driver.wait(until.urlIs("http://localhost:3000/"), 2000);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe("http://localhost:3000/");
  });
  
})