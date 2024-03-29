import {
  assessmentRoll as ROLL,
  assessmentTaxes as TAXES,
} from '../utils/property';

const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let browser;

const launchBrowser = async () => {
  if (browser) return;
  browser = await puppeteer.launch({
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-sandbox',
    ],
    headless: true,
  });
};

app.post('/get-property', (req, res) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    await launchBrowser();
    const page = await browser.newPage();

    try {
      if (req.body.clientId !== 1) {
        throw new Error('Invalid Client');
      }

      page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
      );

      page.setDefaultNavigationTimeout(15000);

      await page.goto(ROLL.URL, {
        waitUntil: 'domcontentloaded',
      });

      await page.select(ROLL.SELECT, '0');

      await page.waitForSelector(ROLL.TIP, { visible: true });

      await page.waitForTimeout(250);

      await page.focus(ROLL.ADDRESS_INPUT);

      await page.keyboard.type(req.body.address);

      await page.click(ROLL.BUTTON);

      await page.waitForSelector(ROLL.TABLE, { visible: true });

      await page.waitForTimeout(5);

      const data = await page.$$eval(`${ROLL.TABLE} tr td`, (tds) =>
        tds.map((td) => {
          return td.innerText;
        })
      );

      if (data.length > 4) {
        throw new Error('Invalid Address (please be exact).');
      }

      const rawParcel =
        data.length < 4 ? 'No Property Found' : data[data.length - 1];

      if (rawParcel === 'No Property Found') {
        throw new Error('Invalid Address (no property found).');
      }

      const recordedAddress = data[2];

      const parcelNum = rawParcel.replace(/-/g, '');

      if (parcelNum.length !== 10) {
        throw new Error('Invalid Parcel (you did nothing wrong).');
      }

      await page.goto(TAXES.INPUT_URL, {
        waitUntil: 'domcontentloaded',
      });

      await page.focus(TAXES.PARCEL_INPUT);

      await page.keyboard.type(parcelNum);

      await page.waitForTimeout(5);

      await page.click(TAXES.PARCEL_SUBMIT);

      await page.waitForNavigation();

      await page.waitForTimeout(5);

      const ownerName = await page.$$eval(TAXES.RESULTS_OWNER, (tds) =>
        tds.map((td) => td.innerText)
      );

      const taxAssessment = await page.$$eval(
        `${TAXES.RESULTS_TAXES} tr td`,
        (tds) => tds.map((td) => td.innerText.trim())
      );

      if (taxAssessment.length === 0) {
        throw new Error('Could not get Tax data (you did nothing wrong).');
      }

      const breakdown = await page.$$eval(
        `${TAXES.RESULTS_MELLO_ROOS} tr td`,
        (tds) => tds.map((td) => td.innerText.trim())
      );

      res.json({
        address: recordedAddress.toUpperCase(),
        owner: ownerName[0].split('\t')[1],
        parcel: rawParcel,
        specialAssessment: breakdown,
        taxes: taxAssessment,
      });
    } catch (err) {
      res.send({ error: err.message });
    } finally {
      await page.close();
    }
  });
});

export default {
  handler: app,
  path: '/api',
};
