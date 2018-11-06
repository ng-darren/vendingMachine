const faker = require('faker');
const puppeteer = require('puppeteer');

const person = {
  name: faker.name.firstName() + ' ' + faker.name.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words()
};

describe('Access to Internet', () => {
  var page;

  beforeAll(async () => {
    let browser = await puppeteer.launch({
  	  headless: false
  	});
  	page = await browser.newPage();
  })

  it('should display "google" text on page', async () => {
    await page.goto('https://google.com')
    await page.screenshot({path: 'screenshot.png'});
    await page.waitForSelector('.gsfi')
  });
});

describe('Machine', () => {

  beforeAll(async () => {
    let browser = await puppeteer.launch({
  	  headless: false
  	});
  	page = await browser.newPage();
  })

  it('should display App-header', async () => {
    await page.goto('http://localhost:3000/');
    await page.screenshot({path: 'screenshot.png'});
    await page.waitForSelector('.App-header');
    await page.waitForSelector('.start-button');
    await page.click("button[type=button]");
    await page.waitForSelector('.card');
  });


});
