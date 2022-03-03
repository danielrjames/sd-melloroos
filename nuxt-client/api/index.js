import {
  assessmentRoll as ROLL,
  assessmentTaxes as TAXES,
} from '../utils/property';

const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/get-taxes', function (req, res) {
  if (req.body.clientId !== 1) {
    throw new Error('Invalid Client');
  }

  puppeteer
    .launch({ headless: false })
    .then(async function (browser) {
      const page = await browser.newPage();

      await page.goto(ROLL.URL);

      await page.select(ROLL.SELECT, '0');

      await page.waitForSelector(ROLL.TIP);

      await page.waitForTimeout(300);

      await page.focus(ROLL.ADDRESS_INPUT);

      await page.keyboard.type(req.body.address);

      await page.click(ROLL.BUTTON);

      await page.waitForSelector(ROLL.TABLE);

      const data = await page.$$eval(`${ROLL.TABLE} tr td`, (tds) =>
        tds.map((td) => {
          return td.innerText;
        })
      );

      const rawParcel = data[data.length - 1];

      if (rawParcel === 'No Property Found') {
        await browser.close();

        throw new Error('Invalid Address');
      }

      const parcelNum = rawParcel.replace(/-/g, '');

      if (parcelNum.length !== 10) {
        await browser.close();

        throw new Error('Invalid Parcel (you did nothing wrong)');
      }

      await page.goto(TAXES.INPUT_URL);

      await page.focus(TAXES.PARCEL_INPUT);

      await page.keyboard.type(parcelNum);

      await page.click(TAXES.PARCEL_SUBMIT);

      await page.waitForNavigation();

      const ownerName = await page.$$eval(TAXES.RESULTS_OWNER, (tds) =>
        tds.map((td) => td.innerText)
      );

      const taxAssessment = await page.$$eval(
        `${TAXES.RESULTS_TAXES} tr td`,
        (tds) => tds.map((td) => td.innerText.trim())
      );

      if (taxAssessment.length === 0) {
        await browser.close();

        throw new Error('Could not get Tax results (you did nothing wrong)');
      }

      const breakdown = await page.$$eval(
        `${TAXES.RESULTS_MELLO_ROOS} tr td`,
        (tds) => tds.map((td) => td.innerText.trim())
      );

      if (breakdown.length === 0) {
        await browser.close();

        throw new Error(
          'Could not get Mello Roos Breakdown (you did nothing wrong)'
        );
      }

      await browser.close();

      res.json({
        address: req.body.address.toUpperCase(),
        owner: ownerName[0].split('\t')[1],
        parcel: rawParcel,
        specialAssessment: breakdown,
        taxes: taxAssessment,
      });
    })
    .catch((err) => res.send({ error: err.message }));
});

export default {
  handler: app,
  path: '/api',
};
