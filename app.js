require('colors');

const fs = require('fs');
const csv = require('csv-parse/lib/sync');
const path = require('path');
const moment = require('moment');
const readline = require('readline');
const puppeteer = require('puppeteer');

async function recordToFile(filename, url, ogpImgUrl) {
    await fs.writeFileSync(filename, url + ',' + ogpImgUrl + '\n', {
      flag: 'a'
    });
}

(async () => {
  process.stdout.clearLine();
  const browser = await puppeteer.launch({});

  const fileName = moment().format('YYYYMMDDHHmmss') + '.csv'
  const filePath = path.join(__dirname, 'results', fileName);
  const urls = await csv(fs.readFileSync('urls.csv'));
  for(let i=0; i<urls.length; i++) {
    const url   = urls[i][0];
    const page = await browser.newPage()

    process.stdout.write(url + '...' + '取得中'.blue);
    let ogpImgUrl
    try {
      const response = await page.goto(url, {
        waitUntil: 'networkidle0'
      });

      ogpImgUrl = await page.$eval("meta[property='og:image']", (elem) => elem.content);
    } catch(e) {
      ogpImgUrl = ''
    }
    await recordToFile(filePath, url, ogpImgUrl);

    readline.cursorTo(process.stdout, 0);
    process.stdout.write(url + '...' + '記録済'.green + "\n");

    await page.close();
  }

  process.stdout.write('\n\n');
  process.stdout.write('============================================\n');
  process.stdout.write('Saved a result file. \n');
  process.stdout.write('Execute the following command to copy the result:\n\n');
  process.stdout.write(('cat ' + filePath + ' | pbcopy\n').magenta);
  process.stdout.write('============================================\n');

  await browser.close();
})();
