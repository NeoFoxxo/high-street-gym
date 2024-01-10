import { Builder, By, until, WebDriver } from "selenium-webdriver";

describe("Class booking functionality", () => {
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

    await driver.get("http://localhost:3000/classes");
    await driver.wait(until.urlIs("http://localhost:3000/classes"), 2000);
  });

  afterEach(async () => {
    await driver.quit();
  });
  
  it("Should receive success message after a class is booked", async () => {
    await driver.wait(until.elementLocated(By.xpath("//div[@data-testid='appointment-2023-07-18T02:10:00.000Z']")));
    await driver.findElement(By.xpath("//div[@data-testid='appointment-2023-07-18T02:10:00.000Z']")).click();

    await driver.findElement(By.className("btn-primary")).click();
    await driver.findElement(By.xpath("//*[@id='book_modal']/form/div/button[1]")).click();

    await driver.wait(until.elementLocated(By.xpath("//div[contains(text(),'Class successfully booked!')]"), 2000));
    const successMessage = await driver.findElement(By.xpath("//div[contains(text(),'Class successfully booked!')]"))
    expect(successMessage).not.toBeNull();
  })
})
