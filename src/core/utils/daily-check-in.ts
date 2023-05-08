import DailyCheckInPage from '@core/pom/DailyCheckInPage.js';
import { isDev } from '@lib/config.js';
import * as playwright from 'playwright';

import type { Lang } from '@core/schema/types.js';
import type { ResponseBody } from '@core/types.js';

const hoyolabCookieTemplate = {
  domain: '.hoyolab.com',
  path: '/',
  secure: true,
};

export default async function dailyCheckIn(data: {
  ltoken: string;
  ltuid: string;
  lang: Lang;
}): Promise<ResponseBody> {
  const { ltoken, ltuid, lang } = data;

  const browser = await playwright.chromium.launch({ headless: !isDev });
  const context = await browser.newContext();
  await context.addCookies([
    { name: 'ltoken', value: ltoken, ...hoyolabCookieTemplate },
    { name: 'ltuid', value: ltuid, ...hoyolabCookieTemplate },
  ]);

  const dailyCheckInPage = new DailyCheckInPage(await context.newPage(), lang);
  await dailyCheckInPage.goto();
  const body = await dailyCheckInPage.dailyCheckIn();

  await dailyCheckInPage.close();
  await context.close();
  await browser.close();

  return body;
}
