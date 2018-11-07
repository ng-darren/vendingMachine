const faker = require('faker');
const puppeteer = require('puppeteer');
const expect = require('expect-puppeteer');
var page;
// describe('Access to Internet', () => {
//   var page;
//
//   beforeAll(async () => {
//     let browser = await puppeteer.launch({
//   	  headless: false
//   	});
//   	page = await browser.newPage();
//   })
//
//   it('should display "google" text on page', async () => {
//     await page.goto('https://google.com')
//     await page.screenshot({path: 'screenshot.png'});
//     await page.waitForSelector('.gsfi');
//   });
// });

describe('Machine', () => {
  beforeAll(async () => {
    let browser = await puppeteer.launch({
  	  headless: false
  	});
  	page = await browser.newPage();
  })

  it('should display drinks when sign in clicked', async () => {
    await page.goto('http://localhost:3000/', {
      waitUntil: ['load','domcontentloaded']
    });
    await page.waitForSelector('.App-header');


    // wait for loading of start state to be loaded
    await page.waitFor(3000);

    await page.waitForSelector('.start-button');
    await page.click('.start-button');
    await page.waitForSelector('#machineId');
  });
});

describe('Drink', () => {
  it('should be able to click on drink', async () => {
    await page.waitForSelector('.card');
    await page.click('.card');
    await page.waitForSelector('.card.selected');
    await page.waitFor(1000);
  });
});

describe('Payment', () => {
  it('should be able to click on cash and then pay button', async () => {
    await page.waitForSelector('#cash');
    await page.click('#cash');
    await page.waitForSelector('#pay');
    await page.click('#pay');
    await page.waitFor(1000);
    await page.waitForSelector('#successAlert');
  });
});

describe('Machine', () => {
  it('should exit when exit is clicked', async () => {
    await page.waitForSelector('.exit-button');
    await page.click('.exit-button');
    await page.waitForSelector('#title');
    await page.waitFor(1000);
  });
});
