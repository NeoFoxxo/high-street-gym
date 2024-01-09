import { Builder, By, until, WebDriver } from "selenium-webdriver";

describe("Blog page functionality", () => {
  /**
   * @type {WebDriver}
   */
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/blog");
  });

  afterEach(async () => {
    await driver.quit();
  });
  
  it("Should navigate to the full post on click", async () => {
    await driver.findElement(By.linkText("My Workout Routine")).click();
    await driver.wait(until.urlIs("http://localhost:3000/blog-details/29"), 2000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe("http://localhost:3000/blog-details/29");
  })
})

describe("Create blog post functionality", () => {
  /**
   * @type {WebDriver}
   */
  let driver;
  jest.setTimeout(10000);

  beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    driver.manage().window().maximize();
    await driver.get("http://localhost:3000/signin");
    await driver.findElement(By.id("email")).sendKeys("jason@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("password");
    await driver.findElement(By.xpath("//button[@type='submit']")).click();
    await driver.wait(until.urlIs("http://localhost:3000/"));
    await driver.findElement(By.linkText("Blog")).click();

    await driver.wait(until.elementLocated(By.linkText("Create a Blog Post")));
    await driver.findElement(By.linkText("Create a Blog Post")).click();

    await driver.wait(until.urlIs("http://localhost:3000/create-blog"));
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("Should show success message on blog creation", async () => {
    await driver.findElement(By.name("title")).sendKeys("test post from selenium");
    await driver.findElement(By.name("article")).sendKeys("description for the test post from selenium")
    await driver.findElement(By.xpath("//button[@type='submit']")).click();
    const successMessage = await driver.wait(until.elementLocated(By.className("alert-success")));
    const successMessageText = await successMessage.getText();
    expect(successMessageText).toBe("Post successfully created!")
  })
})
